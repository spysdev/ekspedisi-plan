// src/components/ItineraryPanel.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ItineraryItem {
  id: string;
  place_name: string;
  location?: string;
  order_index: number;
}

interface Props {
  tripId: string;
}

function SortableItem({ item }: { item: ItineraryItem }) {
  return (
    <div className="p-2 bg-white dark:bg-gray-800 rounded shadow mb-2 flex items-center">
      <span className="cursor-move mr-2">☰</span>
      <div>
        <p className="font-medium">{item.place_name}</p>
        {item.location && <p className="text-sm text-gray-500 dark:text-gray-400">{item.location}</p>}
      </div>
    </div>
  );
}

export default function ItineraryPanel({ tripId }: Props) {
  const [items, setItems] = useState<ItineraryItem[]>([]);

  // Load itinerary from Supabase
  useEffect(() => {
    const fetchItems = async () => {
        const { data, error } = await supabase
          .from('itinerary_items')
          .select('*')
          .eq('trip_id', tripId)
          .order('order_index', { ascending: true });
      if (error) console.error(error);
      else setItems(data as ItineraryItem[]);
    };
    fetchItems();
  }, [tripId]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex).map((it, idx) => ({
        ...it,
        order_index: idx,
      }));
      setItems(newItems);
      // Persist order to Supabase
      const updates = newItems.map((it) =>
        supabase
          .from('itinerary_items')
          .update({ order_index: it.order_index })
          .eq('id', it.id)
      );
      await Promise.all(updates);
    }
  };

  return (
    <section className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3">Itinerary</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem key={item.id} item={item} />
          ))}
        </SortableContext>
      </DndContext>
    </section>
  );
}

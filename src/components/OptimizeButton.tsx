// src/components/OptimizeButton.tsx
import React from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Props {
  tripId: string;
  onRouteUpdate: (route: { lat: number; lng: number }[]) => void;
}

export default function OptimizeButton({ tripId, onRouteUpdate }: Props) {
  const handleOptimize = async () => {
    // Fetch all points (max 30 as per user request)
    const { data, error } = await supabase
      .from('trip_itinerary')
      .select('latitude, longitude, order')
      .eq('trip_id', tripId)
      .order('order', { ascending: true });
    if (error) {
      console.error('Fetch itinerary error', error);
      return;
    }
    const points = (data as any[])
      .filter((p) => p.latitude && p.longitude)
      .map((p) => ({ lat: parseFloat(p.latitude), lng: parseFloat(p.longitude) }));
    if (points.length === 0) return;
    if (points.length > 30) {
      alert('Batas maksimum titik rute adalah 30.');
      return;
    }
    const coordString = points.map((c) => `${c.lng},${c.lat}`).join(';');
    const osrmEndpoint = process.env.NEXT_PUBLIC_OSRM_ENDPOINT || 'https://router.project-osrm.org';
    const url = `${osrmEndpoint}/trip/v1/driving/${coordString}?source=first&roundtrip=false&overview=full&geometries=geojson`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.trips && json.trips.length > 0) {
        const routeCoords = json.trips[0].geometry.coordinates.map((c: [number, number]) => ({ lat: c[1], lng: c[0] }));
        onRouteUpdate(routeCoords);
        // Optionally update itinerary order based on optimized sequence
        const waypoints = json.trips[0].waypoints;
        const updates = waypoints.map((wp: any, idx: number) =>
          supabase
            .from('trip_itinerary')
            .update({ order: idx })
            .eq('id', wp.waypoint_index) // assuming id matches index; adjust as needed
        );
        await Promise.all(updates);
      } else {
        alert('Tidak dapat menghitung rute optimal.');
      }
    } catch (e) {
      console.error('OSRM request failed', e);
      alert('Gagal memanggil OSRM.');
    }
  };

  return (
    <button
      onClick={handleOptimize}
      className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
    >
      Optimalkan Rute
    </button>
  );
}

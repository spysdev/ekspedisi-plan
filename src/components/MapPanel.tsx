// src/components/MapPanel.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { supabase } from '@/lib/supabaseClient';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue in Leaflet with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface Props {
  tripId: string;
  refreshKey?: number;
}

interface Coord {
  lat: number;
  lng: number;
}

function Recenter({ coord }: { coord: Coord }) {
  const map = useMap();
  useEffect(() => {
    map.setView([coord.lat, coord.lng], 13);
  }, [coord, map]);
  return null;
}

export default function MapPanel({ tripId, refreshKey }: Props) {
  const [coords, setCoords] = useState<Coord[]>([]);
  const [route, setRoute] = useState<Coord[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load itinerary items (assume they have latitude & longitude fields)
  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('itinerary_items')
        .select('lat, lng, order_index')
        .eq('trip_id', tripId)
        .order('order_index', { ascending: true });
      if (error) {
        setError(error.message);
        return;
      }
      const points = (data as any[])
        .filter((it) => it.lat != null && it.lng != null)
        .map((it) => ({ lat: Number(it.lat), lng: Number(it.lng) } as Coord));
      setCoords(points);
    };
    fetchItems();
  }, [tripId, refreshKey]);

  // Fetch route from OSRM when we have coordinates (max 30 points as per user request)
  useEffect(() => {
    if (coords.length === 0) return;
    if (coords.length > 30) {
      setError('Batas maksimum titik rute adalah 30.');
      return;
    }
    const fetchRoute = async () => {
      try {
        const coordString = coords.map((c) => `${c.lng},${c.lat}`).join(';');
        const osrmEndpoint = process.env.NEXT_PUBLIC_OSRM_ENDPOINT || 'https://router.project-osrm.org';
        const url = `${osrmEndpoint}/route/v1/driving/${coordString}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.routes && json.routes.length > 0) {
          const pts = json.routes[0].geometry.coordinates.map((c: [number, number]) => ({ lat: c[1], lng: c[0] } as Coord));
          setRoute(pts);
        } else {
          setError('Tidak dapat menghitung rute.');
        }
      } catch (e) {
        setError('Gagal memanggil OSRM.');
      }
    };
    fetchRoute();
  }, [coords]);

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  const center = coords[0] || { lat: 0, lng: 0 };

  return (
    <section className="h-full">
      <MapContainer center={[center.lat, center.lng]} zoom={13} className="h-full w-full rounded-lg shadow">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coords.map((c, i) => (
          <Marker key={i} position={[c.lat, c.lng]} />
        ))}
        {route.length > 0 && <Polyline positions={route.map((c) => [c.lat, c.lng])} color="#ff6600" />}
        <Recenter coord={center} />
      </MapContainer>
    </section>
  );
}

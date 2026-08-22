// src/app/trip/[tripId]/page.tsx
"use client";
import React, { useState } from 'react';
import ItineraryPanel from '@/components/ItineraryPanel';
import MapPanel from '@/components/MapPanel';
import OptimizeButton from '@/components/OptimizeButton';
import CalendarSyncButton from '@/components/CalendarSyncButton';

export default function TripPage({ params }: { params: { tripId: string } }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRouteUpdate = () => {
    // Increment key to force MapPanel to re‑fetch route after optimization
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 min-h-screen">
      <ItineraryPanel tripId={params.tripId} />
      <div className="flex flex-col space-y-4">
        <MapPanel tripId={params.tripId} key={refreshKey} />
        <OptimizeButton tripId={params.tripId} onRouteUpdate={handleRouteUpdate} />
        <CalendarSyncButton tripId={params.tripId} />
      </div>
    </div>
  );
}

// src/components/CalendarSyncButton.tsx
import React from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Props {
  tripId: string;
}

// Helper to generate .ics content from itinerary items
function generateICS(items: { title: string; location: string; date: string }[]) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ekspedisi Plan//EN',
  ];
  items.forEach((it) => {
    lines.push('BEGIN:VEVENT');
    lines.push(`SUMMARY:${it.title}`);
    lines.push(`LOCATION:${it.location}`);
    // Assuming date in ISO format (YYYY-MM-DD)
    const dt = it.date.replace(/[-:]/g, '').split('T')[0];
    lines.push(`DTSTART;VALUE=DATE:${dt}`);
    lines.push(`DTEND;VALUE=DATE:${dt}`);
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export default function CalendarSyncButton({ tripId }: Props) {
  const handleSync = async () => {
    // Fetch itinerary items with basic fields
    const { data, error } = await supabase
      .from('trip_itinerary')
      .select('title, location, date')
      .eq('trip_id', tripId);
    if (error) {
      console.error('Failed to load itinerary', error);
      return;
    }
    const items = data as { title: string; location: string; date: string }[];
    // 1. Generate .ics file and trigger download
    const ics = generateICS(items);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ekspedisi_plan.ics';
    a.click();
    URL.revokeObjectURL(url);

    // 2. Attempt Google Calendar integration if user logged in with Google
    const session = supabase.auth.getSession();
    const { data: sessionData } = await session;
    if (sessionData?.session?.provider_token) {
      const token = sessionData.session.provider_token;
      // Simple insert of events (one per itinerary item)
      for (const it of items) {
        const event = {
          summary: it.title,
          location: it.location,
          start: { date: it.date },
          end: { date: it.date },
        };
        await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(event),
        });
      }
      alert('Sinkronisasi ke Google Calendar selesai.');
    } else {
      alert('Tidak terdeteksi token Google. Silakan login dengan Google di halaman login.');
    }
  };

  return (
    <button
      onClick={handleSync}
      className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
    >
      Sinkronisasi Kalender
    </button>
  );
}

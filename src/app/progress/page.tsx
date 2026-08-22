// src/app/progress/page.tsx
import React from "react";

export default function ProgressPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <article className="prose prose-sm dark:prose-invert max-w-none">
        <h1>Ringkasan Progress</h1>
        <h2>Sudah Selesai</h2>
        <ul>
          <li>File <code>supabaseClient.ts</code> dibuat untuk koneksi Supabase.</li>
          <li>File <code>src/app/status/page.tsx</code> di‑hapus (diganti placeholder).</li>
        </ul>
        <h2>Sedang Dikerjakan</h2>
        <ul>
          <li>Membuat <code>layout.tsx</code> dengan dukungan dark‑mode.</li>
          <li>Mengembangkan halaman split‑screen <code>src/app/trip/[tripId]/page.tsx</code>.</li>
        </ul>
        <h2>Rencana Selanjutnya</h2>
        <ul>
          <li>Implementasi komponen UI: ItineraryPanel, MapPanel, OptimizeButton, dsb.</li>
          <li>Integrasi OSRM routing & Nominatim geocoding.</li>
          <li>Pengujian otomatis dan deployment ke Vercel.</li>
        </ul>
      </article>
    </main>
  );
}

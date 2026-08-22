import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
          Rencanakan Perjalanan Tanpa Beban
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Ekspedisi Plan membantu Anda menyusun itinerary, mengoptimalkan rute, dan mencatat pengeluaran bersama teman dalam satu tempat.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/trip/sample-trip" 
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 w-full sm:w-auto"
          >
            Mulai Perjalanan Baru
          </Link>
          <a 
            href="#features" 
            className="px-8 py-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium transition-colors w-full sm:w-auto"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>

      {/* Feature Highlight Section */}
      <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl w-full text-left">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-blue-500 text-3xl mb-4">🗺️</div>
          <h3 className="text-xl font-bold mb-2">Peta Interaktif</h3>
          <p className="text-gray-600 dark:text-gray-400">Lihat seluruh destinasi Anda dalam satu peta dan otomatis cari rute terpendek antar lokasi.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-blue-500 text-3xl mb-4">🤝</div>
          <h3 className="text-xl font-bold mb-2">Kolaborasi Tim</h3>
          <p className="text-gray-600 dark:text-gray-400">Bagikan tautan undangan ke teman perjalanan Anda dan susun rencana bersama-sama secara real-time.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-blue-500 text-3xl mb-4">💸</div>
          <h3 className="text-xl font-bold mb-2">Split Bill Cerdas</h3>
          <p className="text-gray-600 dark:text-gray-400">Catat semua pengeluaran selama liburan dan biarkan sistem menghitung siapa berutang ke siapa.</p>
        </div>
      </div>
    </div>
  );
}

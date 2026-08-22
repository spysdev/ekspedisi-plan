import React from 'react';

// Simple status page that outlines current and upcoming tasks.
// We'll update this file as development progresses.

type Task = {
  name: string;
  status: 'Pending' | 'In Progress' | 'Done';
  description?: string;
};

const tasks: Task[] = [
  { name: 'Bootstrap Next.js project', status: 'Done', description: 'Project scaffolded in folder ekspedisi-plan' },
  { name: 'Install dependencies', status: 'In Progress', description: 'Installing Supabase, Leaflet, DnD Kit, etc.' },
  { name: 'Configure Supabase client', status: 'Pending' },
  { name: 'Create layout (split-screen) with dark mode toggle', status: 'Pending' },
  { name: 'Build ItineraryPanel component (drag‑and‑drop)', status: 'Pending' },
  { name: 'Build MapPanel component (Leaflet + OSRM routing)', status: 'Pending' },
  { name: 'Implement OptimizeButton (OSRM API)', status: 'Pending' },
  { name: 'Add ExpenseTracker & DocumentLocker', status: 'Pending' },
  { name: 'Add CalendarSyncButton & dark‑mode toggle', status: 'Pending' },
  { name: 'Setup auth (Magic Link & Google OAuth)', status: 'Pending' },
  { name: 'Deploy to Vercel (preview) & test', status: 'Pending' },
];

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">🚀 Status Pengembangan Ekspedisi Plan</h1>
      <ul className="space-y-4">
        {tasks.map((task, idx) => (
          <li
            key={idx}
            className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded shadow"
          >
            <span className="font-mono text-sm w-24">
              {task.status}
            </span>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{task.name}</p>
              {task.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-gray-600 dark:text-gray-400">
        Halaman ini akan terus diperbarui seiring progres pengerjaan.
      </p>
    </main>
  );
}

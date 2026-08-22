// src/app/trip/[tripId]/layout.tsx
"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function TripLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        router.replace('/auth');
      }
    };
    checkAuth();
  }, [router]);

  return <>{children}</>;
}

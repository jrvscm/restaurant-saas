'use client';

import { useState, useEffect } from 'react';
import { decodeJwt } from '../lib/utils'; // Install with `npm install jwt-decode`

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  organizationId: string;
  status: string;
}

interface Session {
  user: User;
  token: string;
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/session', {
          method: 'GET',
          credentials: 'include' // Ensure cookies are included
        });
        if (!response.ok) {
          throw new Error('Failed to fetch session');
        }

        const { token } = await response.json();
        const decoded = decodeJwt(token);

        setSession({
          user: decoded,
          token // Keep the raw token for API requests
        });
      } catch (error) {
        console.error('Error fetching session:', error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { session, loading };
}

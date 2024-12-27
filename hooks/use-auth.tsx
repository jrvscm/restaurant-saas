'use client';

import { useEffect, useState } from 'react';

export const decodeJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      try {
        const decoded = decodeJwt(token);
        setUser(decoded);
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }
  }, []);

  return user;
};

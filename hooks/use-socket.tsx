'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketProps {
  organizationId: string;
}

export function useSocket({ organizationId }: UseSocketProps) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize the socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      query: { organizationId },
      withCredentials: true
    });

    setSocket(socketInstance);

    // Clean up connection on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [organizationId]);

  return socket;
}

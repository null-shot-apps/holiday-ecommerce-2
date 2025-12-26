'use client';

import { useEffect, useState } from 'react';

export default function NotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check if browser supports notifications
    if ('Notification' in window) {
      setPermission(Notification.permission);

      // Request permission if not granted
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(perm => {
          setPermission(perm);
        });
      }
    }
  }, []);

  return null; // This is a utility component with no UI
}


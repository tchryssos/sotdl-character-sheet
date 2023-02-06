import { PropsWithChildren, useMemo, useState } from 'react';

import {
  Notification,
  NotificationsContext,
} from '~/logic/contexts/notificationsContext';

const emptyNotifications: Notification[] = [];

export function NotificationsContextProvider({
  children,
}: PropsWithChildren<never>) {
  const [notifications, setNotifications] =
    useState<Notification[]>(emptyNotifications);

  const addNotifications = (newNotifications: Notification[]) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      ...newNotifications,
    ]);
  };

  const removeNotifications = (notificationIds: string[]) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => !notificationIds.includes(notification.id)
      )
    );
  };

  const clearNotifications = () => {
    setNotifications(emptyNotifications);
  };

  const contextValue = useMemo(
    () => ({
      notifications,
      addNotifications,
      removeNotifications,
      clearNotifications,
    }),
    [notifications]
  );

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
}

import styled from '@emotion/styled';
import { useMemo, useState } from 'react';

import { FREE_USER_CHARACTER_LIMIT_MESSAGE } from '~/constants/errors';
import {
  Notification,
  NotificationsContext,
} from '~/logic/contexts/notificationsContext';

import { FlexBox } from '../../box/FlexBox';
import { NotificationItem } from './components/NotificationItem';

const emptyNotifications: Notification[] = [];

const NotificationsList = styled(FlexBox)`
  position: fixed;
  right: 0;
  bottom: 0;
`;

interface NotificationContextProviderProps {
  children: React.ReactNode;
}

export function NotificationsContextProvider({
  children,
}: NotificationContextProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'error',
      timestamp: new Date(),
    },
  ]);

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
      <NotificationsList m={16}>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            removeNotifications={removeNotifications}
          />
        ))}
      </NotificationsList>
    </NotificationsContext.Provider>
  );
}

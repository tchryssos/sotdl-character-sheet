import styled from '@emotion/styled';
import sortBy from 'lodash.sortby';
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
  overflow: scroll;
  max-height: 100vh;
  z-index: 8888;
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
    {
      id: '2',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'info',
      timestamp: new Date(),
    },
    {
      id: '3',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'success',
      timestamp: new Date(),
    },
    {
      id: '4',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'error',
      timestamp: new Date(),
    },
    {
      id: '5',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'info',
      timestamp: new Date(),
    },
    {
      id: '6',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'success',
      timestamp: new Date(),
    },
    {
      id: '7',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'error',
      timestamp: new Date(),
    },
    {
      id: '8',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'info',
      timestamp: new Date(),
    },
    {
      id: '9',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'success',
      timestamp: new Date(),
    },
  ]);

  const addNotifications = (newNotifications: Notification[]) => {
    setNotifications((prevNotifications) =>
      sortBy([...prevNotifications, ...newNotifications], (notification) =>
        notification.timestamp.getTime()
      )
    );
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
      <NotificationsList column gap={12} m={16}>
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

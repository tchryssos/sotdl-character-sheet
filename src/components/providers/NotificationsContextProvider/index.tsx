import styled from '@emotion/styled';
import sortBy from 'lodash.sortby';
import { useMemo, useState } from 'react';

import { NotificationsContext } from '~/logic/contexts/notificationsContext';
import { RpgNotification } from '~/typings/notifications';

import { FlexBox } from '../../box/FlexBox';
import { NotificationItem } from './components/NotificationItem';

const emptyNotifications: RpgNotification[] = [];

const NotificationsList = styled(FlexBox)`
  position: fixed;
  right: 0;
  top: 0;
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
  const [notifications, setNotifications] =
    useState<RpgNotification[]>(emptyNotifications);

  const addNotifications = (newNotifications: RpgNotification[]) => {
    setNotifications((prevNotifications) =>
      sortBy(
        [...prevNotifications, ...newNotifications],
        (notification) => -notification.createdOn.getTime()
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
      <NotificationsList column gap={12} p={16}>
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

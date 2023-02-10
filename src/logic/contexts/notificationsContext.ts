// Notifications context
import { createContext } from 'react';

import { RpgNotification } from '~/typings/notifications';

export type NotificationsContext = {
  notifications: RpgNotification[];
  addNotifications: (notifications: RpgNotification[]) => void;
  removeNotifications: (ids: string[]) => void;
  clearNotifications: () => void;
};

export const NotificationsContext = createContext<NotificationsContext>({
  notifications: [],
  addNotifications: () => null,
  removeNotifications: () => null,
  clearNotifications: () => null,
});

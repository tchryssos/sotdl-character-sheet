// Notifications context
import { createContext } from 'react';

import { NotificationSeverity } from '~/typings/notifications';

export type Notification = {
  id: string;
  title: string;
  message?: string;
  type: NotificationSeverity;
  timestamp: Date;
};

export type NotificationsContext = {
  notifications: Notification[];
  addNotifications: (notifications: Notification[]) => void;
  removeNotifications: (ids: string[]) => void;
  clearNotifications: () => void;
};

export const NotificationsContext = createContext<NotificationsContext>({
  notifications: [],
  addNotifications: () => null,
  removeNotifications: () => null,
  clearNotifications: () => null,
});

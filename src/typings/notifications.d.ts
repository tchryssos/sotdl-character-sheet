export type NotificationSeverity = 'success' | 'error' | 'warning' | 'info';

export type RpgNotification = {
  id: string;
  title: string;
  message?: string;
  type: NotificationSeverity;
  createdOn: Date;
};

export type NotificationBody = Pick<
  RpgNotification,
  'message' | 'title' | 'type'
>;

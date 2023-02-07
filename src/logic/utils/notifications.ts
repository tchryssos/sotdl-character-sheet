import { v4 as uuid4 } from 'uuid';

import { NotificationBody, RpgNotification } from '~/typings/notifications';

export const createNotification = (
  notificationBody: NotificationBody
): RpgNotification => ({
  id: uuid4(),
  createdOn: new Date(),
  ...notificationBody,
});

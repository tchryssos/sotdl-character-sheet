import { NotificationBody } from '~/typings/notifications';

export enum ErrorTypes {
  NotAuthorizedGeneric = 'Not Authorized',
  FreeCharacterLimit = 'Free User Character Limit',
}

type ErrorNotificationBody = Omit<NotificationBody, 'type'> & {
  type: 'error';
};

export const ERRORS: Record<ErrorTypes, ErrorNotificationBody> = {
  [ErrorTypes.NotAuthorizedGeneric]: {
    title: ErrorTypes.NotAuthorizedGeneric,
    type: 'error',
  },
  [ErrorTypes.FreeCharacterLimit]: {
    title: ErrorTypes.FreeCharacterLimit,
    message: 'Free users are limited to 5 characters',
    type: 'error',
  },
};

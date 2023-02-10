import { NotificationBody } from '~/typings/notifications';

export enum ErrorTypes {
  SomethingWentWrong = 'Something went wrong completing your request',
  NotAuthorizedGeneric = 'Not authorized',
  FreeCharacterLimit = 'Free user character limit',
  CharacterSaveFailure = 'Something went wrong saving your character',
  CharacterNotFound = 'Character not found',
}

type ErrorNotificationBody = Omit<NotificationBody, 'type'> & {
  type: 'error';
};

export const ERRORS: Record<ErrorTypes, ErrorNotificationBody> = {
  [ErrorTypes.SomethingWentWrong]: {
    title: ErrorTypes.SomethingWentWrong,
    message: 'Try again later',
    type: 'error',
  },
  [ErrorTypes.NotAuthorizedGeneric]: {
    title: ErrorTypes.NotAuthorizedGeneric,
    type: 'error',
  },
  [ErrorTypes.FreeCharacterLimit]: {
    title: ErrorTypes.FreeCharacterLimit,
    message: 'Free users are limited to 5 characters',
    type: 'error',
  },
  [ErrorTypes.CharacterSaveFailure]: {
    title: ErrorTypes.CharacterSaveFailure,
    type: 'error',
  },
  [ErrorTypes.CharacterNotFound]: {
    title: ErrorTypes.CharacterNotFound,
    type: 'error',
  },
};

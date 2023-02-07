import { NotificationBody } from '~/typings/notifications';

export enum SuccessTypes {
  CharacterCloned = 'Character Cloned Successfully',
}

type SuccessNotificationBody = Omit<NotificationBody, 'type'> & {
  type: 'success';
};

export const SUCCESSES: Record<SuccessTypes, SuccessNotificationBody> = {
  [SuccessTypes.CharacterCloned]: {
    title: SuccessTypes.CharacterCloned,
    type: 'success',
  },
};

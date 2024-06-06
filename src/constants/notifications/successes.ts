import { NotificationBody } from '~/typings/notifications';

export enum SuccessTypes {
  CharacterCloned = 'Character cloned successfully',
  CharacterSaved = 'Character saved successfully',
  CharacterDeleted = 'Character deleted successfully',
  CharacterMadeInactive = 'Character deactivated successfully',
}

type SuccessNotificationBody = Omit<NotificationBody, 'type'> & {
  type: 'success';
};

export const SUCCESSES: Record<SuccessTypes, SuccessNotificationBody> = {
  [SuccessTypes.CharacterCloned]: {
    title: SuccessTypes.CharacterCloned,
    type: 'success',
  },
  [SuccessTypes.CharacterSaved]: {
    title: SuccessTypes.CharacterSaved,
    type: 'success',
  },
  [SuccessTypes.CharacterDeleted]: {
    title: SuccessTypes.CharacterDeleted,
    type: 'success',
  },
  [SuccessTypes.CharacterMadeInactive]: {
    title: SuccessTypes.CharacterMadeInactive,
    type: 'success',
  },
};

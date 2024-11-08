import { NotificationBody } from '~/typings/notifications';

export enum SuccessTypes {
  CharacterCloned = 'Character cloned successfully',
  CharacterSaved = 'Character saved successfully',
  CharacterAutosaved = 'Character automatically saved',
  CharacterDeleted = 'Character deleted successfully',
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
  [SuccessTypes.CharacterAutosaved]: {
    title: SuccessTypes.CharacterAutosaved,
    type: 'success',
  },
};

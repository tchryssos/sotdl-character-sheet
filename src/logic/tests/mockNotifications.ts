import sortBy from 'lodash.sortby';

import { ERRORS } from '~/constants/notifications/errors';

export const MOCK_NOTIFICATIONS = sortBy(
  [
    {
      id: '1',
      title: ERRORS['Free user character limit'].title,
      message: ERRORS['Free user character limit'].message,
      type: 'error',
      createdOn: new Date('2022-01-01'),
    },
    {
      id: '2',
      title: ERRORS['Free user character limit'].title,
      message: ERRORS['Free user character limit'].message,
      type: 'info',
      createdOn: new Date('2022-09-01'),
    },
    {
      id: '3',
      title: ERRORS['Free user character limit'].title,
      message: ERRORS['Free user character limit'].message,
      type: 'success',
      createdOn: new Date('2023-02-07'),
    },
    {
      id: '4',
      title: ERRORS['Free user character limit'].title,
      message: ERRORS['Free user character limit'].message,
      type: 'error',
      createdOn: new Date('2023-01-08'),
    },
    {
      id: '5',
      title: ERRORS['Free user character limit'].title,
      message: ERRORS['Free user character limit'].message,
      type: 'info',
      createdOn: new Date('2023-02-06'),
    },
    {
      id: '6',
      title: ERRORS['Free user character limit'].title,
      message: ERRORS['Free user character limit'].message,
      type: 'success',
      createdOn: new Date('2021-08-01'),
    },
    {
      id: '7',
      title: ERRORS['Free user character limit'].title,
      message: ERRORS['Free user character limit'].message,
      type: 'error',
      createdOn: new Date('2023-02-01'),
    },
    {
      id: '8',
      title: ERRORS['Free user character limit'].title,
      message: ERRORS['Free user character limit'].message,
      type: 'info',
      createdOn: new Date('2022-12-12'),
    },
    {
      id: '9',
      title: ERRORS['Free user character limit'].title,
      message: ERRORS['Free user character limit'].message,
      type: 'success',
      createdOn: new Date(),
    },
  ],
  (notification) => -notification.createdOn.getTime()
);

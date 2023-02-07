import sortBy from 'lodash.sortby';

import { FREE_USER_CHARACTER_LIMIT_MESSAGE } from '~/constants/notifications/errors';

export const MOCK_NOTIFICATIONS = sortBy(
  [
    {
      id: '1',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'error',
      createdOn: new Date('2022-01-01'),
    },
    {
      id: '2',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'info',
      createdOn: new Date('2022-09-01'),
    },
    {
      id: '3',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'success',
      createdOn: new Date('2023-02-07'),
    },
    {
      id: '4',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'error',
      createdOn: new Date('2023-01-08'),
    },
    {
      id: '5',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'info',
      createdOn: new Date('2023-02-06'),
    },
    {
      id: '6',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'success',
      createdOn: new Date('2021-08-01'),
    },
    {
      id: '7',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'error',
      createdOn: new Date('2023-02-01'),
    },
    {
      id: '8',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'info',
      createdOn: new Date('2022-12-12'),
    },
    {
      id: '9',
      title: 'No more free character slots',
      message: FREE_USER_CHARACTER_LIMIT_MESSAGE,
      type: 'success',
      createdOn: new Date(),
    },
  ],
  (notification) => -notification.createdOn.getTime()
);

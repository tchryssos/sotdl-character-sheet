import { formatDistance } from 'date-fns';

export const timeAgo = (date: Date) =>
  `${formatDistance(date, new Date())} ago`;

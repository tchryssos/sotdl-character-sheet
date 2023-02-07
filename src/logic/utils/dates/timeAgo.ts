import { formatDistance, parseISO } from 'date-fns';

export const timeAgo = (date: Date) =>
  `${formatDistance(parseISO(String(date)), new Date())} ago`;

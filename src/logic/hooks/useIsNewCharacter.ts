import { useRouter } from 'next/router';

import { NEW_ID } from '~/constants/routing/shared';

export const useIsNewCharacter = () => {
  const { query } = useRouter();

  return Boolean(query.id === NEW_ID);
};

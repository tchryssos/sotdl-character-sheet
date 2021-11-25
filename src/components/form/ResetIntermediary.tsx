import { character } from '@prisma/client';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { DEFAULT_VALUES } from '~/constants/form';
import { NEW_CHARACTER_ID } from '~/constants/routing';
import { fetchCharacter } from '~/logic/api/client/fetchCharacter';
import { decodeCharacterObj } from '~/logic/utils/decodeCharacterObj';
import { ApiResponse } from '~/typings/api';
import { isSuccessfulCharacterResponse } from '~/typings/characters.guards';

interface ResetIntermediaryProps {
  setIsLoading: (isLoading: boolean) => void;
}

export const ResetIntermediary: React.FC<ResetIntermediaryProps> = ({
  setIsLoading,
}) => {
  const {
    query: { id },
    push,
  } = useRouter();
  const { reset } = useFormContext();

  useEffect(() => {
    if (id) {
      if (id === NEW_CHARACTER_ID) {
        reset(DEFAULT_VALUES);
      } else {
        const onLoad = async () => {
          setIsLoading(true);
          const resp: ApiResponse<character> = await fetchCharacter(
            id as string
          );
          if (isSuccessfulCharacterResponse(resp)) {
            reset(decodeCharacterObj(resp.characterCode));
          }
          setIsLoading(false);
        };
        onLoad();
      }
    }
  }, [id, reset, setIsLoading]);

  return null;
};

import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { createCharacterRoute, NEW_ID } from '~/constants/routing/shared';
import { DEFAULT_VALUES } from '~/constants/sotdl/form';
import { fetchCharacter } from '~/logic/api/client/fetchCharacter';
import { ApiResponse } from '~/typings/api';
import { StrictCharacter } from '~/typings/characters';
import { isSuccessfulCharacterResponse } from '~/typings/characters.guards';

import { LoadingPageSpinner } from '../LoadingSpinner';

interface ResetIntermediaryProps {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  children: React.ReactNode[] | React.ReactNode;
  setIsMyCharacter: (isMine: boolean) => void;
}

export const LoadingIntermediary: React.FC<ResetIntermediaryProps> = ({
  setIsLoading,
  isLoading,
  children,
  setIsMyCharacter,
}) => {
  const {
    query: { id },
    push,
  } = useRouter();
  const { reset } = useFormContext();
  const { user } = useUser();

  useEffect(() => {
    if (id) {
      if (id === NEW_ID) {
        reset(DEFAULT_VALUES);
      } else {
        const onLoad = async () => {
          setIsLoading(true);
          const resp: ApiResponse<StrictCharacter> = await fetchCharacter(
            id as string
          );
          if (isSuccessfulCharacterResponse(resp)) {
            setIsMyCharacter(resp.playerId === user?.id);
            reset(resp.characterData);
          } else {
            push(createCharacterRoute(NEW_ID));
          }
          setIsLoading(false);
        };

        onLoad();
      }
    }
  }, [id, reset, setIsLoading, push, user?.id, setIsMyCharacter]);

  if (isLoading) {
    return <LoadingPageSpinner title="Form loading" titleId="form-loading" />;
  }
  return <>{children}</>;
};

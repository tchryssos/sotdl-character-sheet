import styled from '@emotion/styled';
import { character } from '@prisma/client';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { DEFAULT_VALUES } from '~/constants/form';
import {
  createCharacterSheetRoute,
  NEW_CHARACTER_ID,
} from '~/constants/routing';
import { fetchCharacter } from '~/logic/api/client/fetchCharacter';
import { decodeCharacterObj } from '~/logic/utils/decodeCharacterObj';
import { ApiResponse } from '~/typings/api';
import { isSuccessfulCharacterResponse } from '~/typings/characters.guards';

import { FlexBox } from '../box/FlexBox';
import { LoadingPageSpinner } from '../LoadingSpinner';

interface ResetIntermediaryProps {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  children: React.ReactNode[] | React.ReactNode;
}

export const LoadingIntermediary: React.FC<ResetIntermediaryProps> = ({
  setIsLoading,
  isLoading,
  children,
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
          } else {
            push(createCharacterSheetRoute('new'));
          }
          setIsLoading(false);
        };

        onLoad();
      }
    }
  }, [id, reset, setIsLoading, push]);

  if (isLoading) {
    return <LoadingPageSpinner title="Form loading" titleId="form-loading" />;
  }
  return <>{children}</>;
};

import styled from '@emotion/styled';
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

import { FlexBox } from '../box/FlexBox';
import { LoadingSpinner } from '../LoadingSpinner';

const LoadingOuter = styled(FlexBox)`
  width: 100%;
`;

const LoadingInner = styled(FlexBox)(({ theme }) => ({
  width: '25%',
  [theme.breakpoints.xs]: {
    width: '15%',
  },
  [theme.breakpoints.md]: {
    width: '12%',
  },
  [theme.breakpoints.lg]: {
    width: '10%',
  },
}));

interface ResetIntermediaryProps {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  children: React.ReactNode[] | React.ReactNode;
}

export const ResetIntermediary: React.FC<ResetIntermediaryProps> = ({
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
          }
          setIsLoading(false);
        };
        onLoad();
      }
    }
  }, [id, reset, setIsLoading]);

  if (isLoading) {
    return (
      <LoadingOuter center>
        <LoadingInner>
          <LoadingSpinner title="Form loading" titleId="form-loading" />
        </LoadingInner>
      </LoadingOuter>
    );
  }
  return <>{children}</>;
};

import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { StrictCharacter } from '~/typings/characters';

interface ResetIntermediaryProps {
  children: React.ReactNode[] | React.ReactNode;
  setIsMyCharacter: (isMine: boolean) => void;
  character: StrictCharacter;
}

export function LoadingIntermediary({
  children,
  setIsMyCharacter,
  character,
}: ResetIntermediaryProps) {
  const { reset } = useFormContext();
  const { user } = useUser();

  useEffect(() => {
    setIsMyCharacter(character.playerId === user?.id);
    reset(character.characterData);
  }, [character, setIsMyCharacter, reset, user?.id]);

  return <>{children}</>;
}

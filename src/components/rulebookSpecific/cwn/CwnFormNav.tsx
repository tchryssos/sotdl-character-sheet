import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { BaseButton } from '~/components/buttons/BaseButton';
import { FormNavBaseButtons } from '~/components/formNav/FormNavBaseButtons';
import { Text } from '~/components/Text';
import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { guaranteeNumberValue } from '~/logic/utils/form/guaranteeNumberValue';
import { CwnCharacterData } from '~/typings/cwn/characterData';

interface CwnFormNavProps {
  isMyCharacter: boolean;
}

interface CharacterHeaderProps {
  headerPortalNode: HTMLDivElement;
  name: string;
}

const HealthButton = styled(BaseButton)(({ theme }) => ({
  padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
}));

function CharacterNavHeader({ headerPortalNode, name }: CharacterHeaderProps) {
  const atLeastSm = useBreakpointsAtLeast('sm');

  const { watch, setValue } = useFormContext<CwnCharacterData>();

  const currentHealth = guaranteeNumberValue(watch('health_current'));
  const maxHealth = watch('health_max');
  const level = watch('level');

  const onHealthClick = () => {
    setValue('health_current', Math.max(0, currentHealth - 1));
  };

  return (
    <>
      {createPortal(
        <FlexBox alignItems="center" gap={16}>
          <FlexBox flexDirection="column">
            <Text as="h2" fontWeight="bold" variant="body-lg">
              {name}
            </Text>
            <FlexBox>
              <Text as="p" color="textAccent" variant="body-xs">
                Level {level}
              </Text>
            </FlexBox>
          </FlexBox>
          {atLeastSm && (
            <HealthButton
              severity={currentHealth <= 0 ? 'danger' : 'normal'}
              title="Take one damage"
              onClick={onHealthClick}
            >
              <Text as="p" variant="body-xs">
                Health
              </Text>
              <Text as="p" fontWeight="bold" variant="body-lg">
                {currentHealth}/{maxHealth}
              </Text>
            </HealthButton>
          )}
        </FlexBox>,
        headerPortalNode
      )}
    </>
  );
}

export function CwnFormNav({ isMyCharacter }: CwnFormNavProps) {
  const { watch } = useFormContext<CwnCharacterData>();

  const name = watch('name');

  const { iconPortalNode, headerPortalNode, setDocTitle } =
    useContext(NavContext);

  useEffect(() => {
    const title = `${name} - CWN`;
    setDocTitle(title);
  }, [name, setDocTitle]);

  return (
    <>
      {iconPortalNode &&
        createPortal(
          <FormNavBaseButtons
            characterName={name}
            isMyCharacter={isMyCharacter}
            rulebookName="cwn"
          />,
          iconPortalNode
        )}
      {headerPortalNode && (
        <CharacterNavHeader headerPortalNode={headerPortalNode} name={name} />
      )}
    </>
  );
}

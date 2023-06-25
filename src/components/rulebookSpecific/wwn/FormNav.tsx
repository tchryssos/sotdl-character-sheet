import styled from '@emotion/styled';
import { max } from 'lodash';
import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { BaseButton } from '~/components/buttons/BaseButton';
import { FormNavBaseButtons } from '~/components/formNav/FormNavBaseButtons';
import { Text } from '~/components/Text';
import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { WwnCharacterData } from '~/typings/wwn/characterData';

interface FormNavProps {
  isMyCharacter: boolean;
}

interface CharacterHeaderProps {
  headerPortalNode: HTMLDivElement;
  name: string;
  characterClass: string;
}

const HealthButton = styled(BaseButton)(({ theme }) => ({
  padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
}));

function CharacterHeader({
  headerPortalNode,
  name,
  characterClass,
}: CharacterHeaderProps) {
  const atLeastSm = useBreakpointsAtLeast('sm');
  const { watch, setValue } = useFormContext<WwnCharacterData>();
  const maxHealth = watch('health_max');
  const currentHealth = watch('health_current');
  const ancestry = watch('ancestry');
  const level = watch('level');

  const onHealthClick = () => {
    setValue('health_current', max([0, currentHealth - 1]) as number);
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
                {ancestry ? ` ${ancestry}` : ''} {characterClass}
              </Text>
            </FlexBox>
          </FlexBox>
          {atLeastSm && (
            <HealthButton title="Decrement health" onClick={onHealthClick}>
              <FlexBox alignItems="center" flexDirection="column">
                <Text as="p" variant="body-xs">
                  Hit Points
                </Text>
                <Text as="p" fontWeight="bold" variant="body-lg">
                  {currentHealth}/{maxHealth}
                </Text>
              </FlexBox>
            </HealthButton>
          )}
        </FlexBox>,
        headerPortalNode
      )}
    </>
  );
}

export function FormNav({ isMyCharacter }: FormNavProps) {
  const { watch } = useFormContext<WwnCharacterData>();
  const name = watch('name');
  const characterClass = watch('class_name');

  const { iconPortalNode, headerPortalNode, setDocTitle } =
    useContext(NavContext);

  useEffect(() => {
    const title = `${name}${characterClass ? ` - ${characterClass}` : ''}`;
    setDocTitle(title);
  }, [name, setDocTitle, characterClass]);

  return (
    <>
      {iconPortalNode &&
        createPortal(
          <FormNavBaseButtons
            characterName={name}
            isMyCharacter={isMyCharacter}
            rulebookName="wwn"
          />,
          iconPortalNode
        )}
      {headerPortalNode && (
        <CharacterHeader
          characterClass={characterClass}
          headerPortalNode={headerPortalNode}
          name={name}
        />
      )}
    </>
  );
}

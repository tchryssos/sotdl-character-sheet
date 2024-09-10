import styled from '@emotion/styled';
import { min, startCase } from 'lodash';
import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { BaseButton } from '~/components/buttons/BaseButton';
import { FormNavBaseButtons } from '~/components/formNav/FormNavBaseButtons';
import { Text } from '~/components/Text';
import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

interface FormNavProps {
  isMyCharacter: boolean;
}

interface CharacterHeaderProps {
  headerPortalNode: HTMLDivElement;
  name: string;
}

const HealthButton = styled(BaseButton)(({ theme }) => ({
  padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
}));

function CharacterHeader({ headerPortalNode, name }: CharacterHeaderProps) {
  const atLeastXs = useBreakpointsAtLeast('xs');
  const { watch, setValue } = useFormContext<SotwwCharacterData>();

  const currentHealth = watch('health_current');
  const damage = watch('damage');
  const ancestry = watch('ancestry');
  const level = watch('level');
  const novicePath = watch('path_novice');
  const expertPath = watch('path_expert');
  const masterPath = watch('path_master');

  const currentPath = startCase(masterPath || expertPath || novicePath);

  const onHealthClick = () => {
    setValue('damage', min([currentHealth, damage + 1]) as number);
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
                Level {level} {ancestry} {currentPath}
              </Text>
            </FlexBox>
          </FlexBox>
          {atLeastXs && (
            <HealthButton title="Increment Damage" onClick={onHealthClick}>
              <FlexBox alignItems="center" flexDirection="column">
                <Text as="p" variant="body-xs">
                  Damage
                </Text>
                <Text as="p" fontWeight="bold" variant="body-lg">
                  {damage}/{currentHealth}
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
  const { watch } = useFormContext<SotwwCharacterData>();

  const name = watch('name');

  const { iconPortalNode, headerPortalNode, setDocTitle } =
    useContext(NavContext);

  useEffect(() => {
    const title = `${name} - SotWW`;
    setDocTitle(title);
  }, [name, setDocTitle]);

  return (
    <>
      {iconPortalNode &&
        createPortal(
          <FormNavBaseButtons
            characterName={name}
            isMyCharacter={isMyCharacter}
            rulebookName="sotww"
          />,
          iconPortalNode
        )}
      {headerPortalNode && (
        <CharacterHeader headerPortalNode={headerPortalNode} name={name} />
      )}
    </>
  );
}

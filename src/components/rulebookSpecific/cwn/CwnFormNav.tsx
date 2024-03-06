import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { BaseButton } from '~/components/buttons/BaseButton';
import { IconButton } from '~/components/buttons/IconButton';
import { FormNavBaseButtons } from '~/components/formNav/FormNavBaseButtons';
import { Refresh } from '~/components/icons/Refresh';
import { Text } from '~/components/Text';
import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { guaranteeNumberValue } from '~/logic/utils/form/guaranteeNumberValue';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
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
  minWidth: pxToRem(108),
}));

function CharacterNavHeader({ headerPortalNode, name }: CharacterHeaderProps) {
  const atLeastSm = useBreakpointsAtLeast('sm');

  const { watch, setValue } = useFormContext<CwnCharacterData>();

  const currentHealth = guaranteeNumberValue(watch('health_current'));
  const maxHealth = watch('health_max');
  const level = watch('level');
  const currentDamageSoak = guaranteeNumberValue(watch('damage_soak_current'));
  const maxDamageSoak = guaranteeNumberValue(watch('damage_soak_max'));

  const onHealthClick = () => {
    if (currentDamageSoak) {
      setValue('damage_soak_current', Math.max(0, currentDamageSoak - 1));
    } else {
      setValue('health_current', Math.max(0, currentHealth - 1));
    }
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
            <FlexBox alignItems="center" gap={8}>
              <HealthButton
                severity={currentHealth <= 0 ? 'danger' : 'normal'}
                title="Take one damage"
                onClick={onHealthClick}
              >
                <Text as="p" variant="body-xs">
                  Health{currentDamageSoak ? ' + Soak' : ''}
                </Text>
                <Text as="p" fontWeight="bold" variant="body-lg">
                  {currentHealth + currentDamageSoak}/{maxHealth}
                </Text>
              </HealthButton>
              <IconButton
                onClick={() => {
                  setValue('damage_soak_current', maxDamageSoak);
                }}
              >
                <Refresh
                  title="Refresh Damage Soak"
                  titleId="refresh-damage-soak"
                />
              </IconButton>
            </FlexBox>
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

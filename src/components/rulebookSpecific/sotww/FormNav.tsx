import styled from '@emotion/styled';
import { min, startCase } from 'lodash';
import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { BaseButton } from '~/components/buttons/BaseButton';
import { CharacterPortrait } from '~/components/form/CharacterPortrait';
import {
  FormNavBaseButtons,
  QuickAccessProps,
} from '~/components/formNav/FormNavBaseButtons';
import { Text } from '~/components/Text';
import { NavContext } from '~/logic/contexts/navContext';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { guaranteeNumberValue } from '~/logic/utils/form/guaranteeNumberValue';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import {
  CharacterData,
  LastSaved,
  StrictCharacter,
} from '~/typings/characters';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

interface FormNavProps {
  isMyCharacter: boolean;
  quickAccess?: QuickAccessProps;
  setLastSaved: (ls: LastSaved) => void;
}

interface CharacterHeaderProps {
  headerPortalNode: HTMLDivElement;
  name: string;
}

const HealthButton = styled(BaseButton)(({ theme }) => ({
  padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
  minWidth: pxToRem(66),
}));

const ClampedText = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function CharacterHeader({ headerPortalNode, name }: CharacterHeaderProps) {
  const atLeastXs = useBreakpointsAtLeast('xs');
  const { watch, setValue } = useFormContext<SotwwCharacterData>();

  const currentHealth = guaranteeNumberValue(watch('health_current'));
  const damage = guaranteeNumberValue(watch('damage'));
  const ancestry = watch('ancestry');
  const level = watch('level');
  const novicePath = watch('path_novice');
  const expertPath = watch('path_expert');
  const masterPath = watch('path_master');
  const imageUrl = watch('image_url');

  const currentPath = startCase(masterPath || expertPath || novicePath);

  const onHealthClick = () => {
    setValue('damage', min([currentHealth, damage + 1]) as number);
  };

  return (
    <>
      {createPortal(
        <FlexBox alignItems="center" gap={atLeastXs ? 16 : 8}>
          {!atLeastXs && imageUrl && (
            <CharacterPortrait alt={name} height={36} src={imageUrl} />
          )}
          <FlexBox flexDirection="column">
            <ClampedText as="h2" fontWeight="bold" variant="body-lg">
              {name}
            </ClampedText>
            <FlexBox>
              <ClampedText as="p" color="textAccent" variant="body-xs">
                Level {level} {ancestry} {currentPath}
              </ClampedText>
            </FlexBox>
          </FlexBox>
          {atLeastXs && (
            <HealthButton
              severity={damage >= currentHealth ? 'danger' : 'normal'}
              title="Increment Damage"
              onClick={onHealthClick}
            >
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

export function FormNav({
  isMyCharacter,
  quickAccess,
  setLastSaved,
}: FormNavProps) {
  const { watch } = useFormContext<SotwwCharacterData>();

  const name = watch('name');

  const { iconPortalNode, headerPortalNode, setDocTitle } =
    useContext(NavContext);

  useEffect(() => {
    const title = `${name} - SotWW`;
    setDocTitle(title);
  }, [name, setDocTitle]);

  const onSaveSuccess = (
    char: StrictCharacter<CharacterData>,
    auto: boolean
  ) => {
    setLastSaved({
      auto,
      on: char.lastModifiedOn,
    });
  };

  return (
    <>
      {iconPortalNode &&
        createPortal(
          <>
            <FormNavBaseButtons
              characterName={name}
              isMyCharacter={isMyCharacter}
              quickAccess={quickAccess}
              rulebookName="sotww"
              onSaveSuccess={onSaveSuccess}
            />
          </>,
          iconPortalNode
        )}
      {headerPortalNode && (
        <CharacterHeader headerPortalNode={headerPortalNode} name={name} />
      )}
    </>
  );
}

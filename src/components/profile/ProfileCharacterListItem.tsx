/* eslint-disable camelcase */
import styled from '@emotion/styled';

import { createCharacterRoute } from '~/constants/routing/shared';
import { CharacterData, StrictCharacter } from '~/typings/characters';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';
import { SotwwCharacterData } from '~/typings/sotww/characterData';
import { WwnCharacterData } from '~/typings/wwn/characterData';

import { FlexBox } from '../box/FlexBox';
import { CharacterPortrait } from '../form/CharacterPortrait';
import { Link } from '../Link';
import { Text } from '../Text';

const CharacterLink = styled(Link)`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing[4]};
  border: ${({ theme }) =>
    `${theme.borderWidth[1]} solid ${theme.colors.accentLight}`};
`;

const Caps = styled.span`
  text-transform: uppercase;
`;

interface ProfileCharacterListItemProps {
  character: StrictCharacter<CharacterData>;
}

export function ProfileCharacterListItem({
  character,
}: ProfileCharacterListItemProps) {
  const {
    id,
    rulebookName,
    name,
    characterData: { level, type, ...characterData },
  } = character;

  let characterDescriptor = '';
  let imageUrl = '';

  switch (type) {
    case 'sotdl': {
      const { novice_path, expert_path, master_path, ancestry } =
        characterData as SotdlCharacterData;
      characterDescriptor =
        master_path || expert_path || novice_path || ancestry || '';
      break;
    }
    case 'wwn':
      characterDescriptor = (characterData as WwnCharacterData).class_name;
      break;
    case 'sotww': {
      const { path_novice, path_expert, path_master, ancestry, image_url } =
        characterData as SotwwCharacterData;

      characterDescriptor =
        path_master || path_expert || path_novice || ancestry || '';

      imageUrl = image_url;
      break;
    }
    case 'cwn': {
      const { background_name } = characterData as CwnCharacterData;

      characterDescriptor = background_name;
      break;
    }
    default:
      break;
  }

  return (
    <CharacterLink href={createCharacterRoute(id, rulebookName)}>
      <FlexBox alignItems="center" gap={8}>
        {imageUrl && (
          <CharacterPortrait alt={name} height={40} src={imageUrl} />
        )}
        <FlexBox flexDirection="column">
          <Text as="span" variant="body">
            {name}
          </Text>
          <Text as="p" color="textAccent" variant="body-sm">
            <Caps>{rulebookName}</Caps>
            {level !== undefined || characterDescriptor ? ' - ' : ''}
            {level !== undefined ? `Level ${level} ` : ''}
            {characterDescriptor}
          </Text>
        </FlexBox>
      </FlexBox>
    </CharacterLink>
  );
}

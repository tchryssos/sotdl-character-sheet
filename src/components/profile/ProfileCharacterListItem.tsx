/* eslint-disable camelcase */
import styled from '@emotion/styled';

import { createCharacterRoute } from '~/constants/routing/shared';
import { CharacterData, StrictCharacter } from '~/typings/characters';
import { CwnCharacterData } from '~/typings/cwn/characterData';
import { SotdlCharacterData } from '~/typings/sotdl/characterData';
import { SotwwCharacterData } from '~/typings/sotww/characterData';
import { WwnCharacterData } from '~/typings/wwn/characterData';

import { FlexBox } from '../box/FlexBox';
import { Link } from '../Link';
import { Text } from '../Text';
import { ProfileCharacterMenu } from './ProfileCharacterMenu';

const Item = styled(FlexBox)`
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
      const { path_novice, path_expert, path_master, ancestry } =
        characterData as SotwwCharacterData;

      characterDescriptor =
        path_master || path_expert || path_novice || ancestry || '';
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
    <Item alignItems="center" justifyContent="space-between">
      <Link href={createCharacterRoute(id, rulebookName)} title={name}>
        <FlexBox flexDirection="column">
          <FlexBox>
            <Text as="span" variant="body">
              {name}
            </Text>
          </FlexBox>
          <Text as="p" variant="body-sm">
            <Caps>{rulebookName}</Caps>
            {level !== undefined || characterDescriptor ? ' - ' : ''}
            {level !== undefined ? `Level ${level} ` : ''}
            {characterDescriptor}
          </Text>
        </FlexBox>
      </Link>
      <ProfileCharacterMenu id={id} name={name} />
    </Item>
  );
}

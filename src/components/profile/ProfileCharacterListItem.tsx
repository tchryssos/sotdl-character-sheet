import styled from '@emotion/styled';

import { createCharacterRoute } from '~/constants/routing/shared';
import { CharacterData, StrictCharacter } from '~/typings/characters';

import { FlexBox } from '../box/FlexBox';
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
    characterData: { level, ancestry },
  } = character;
  return (
    <CharacterLink href={createCharacterRoute(id, rulebookName)}>
      <FlexBox flexDirection="column">
        <FlexBox>
          <Text as="span" variant="body">
            {name}
          </Text>
        </FlexBox>
        <Text as="p" variant="body-sm">
          <Caps>{rulebookName}</Caps>
          {level !== undefined || ancestry ? ' - ' : ''}
          {level !== undefined ? `Level ${level} ` : ''}
          {`${ancestry ? `${ancestry}` : ''}`}
        </Text>
      </FlexBox>
    </CharacterLink>
  );
}

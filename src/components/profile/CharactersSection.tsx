import styled from '@emotion/styled';

import { CharacterData, StrictCharacter } from '~/typings/characters';

import { FormSection } from '../form/containers/FormSection';
import { Text } from '../Text';
import { ProfileCharacterListItem } from './ProfileCharacterListItem';

const ListItem = styled.li`
  width: 100%;
  height: 100%;
`;

const Section = styled(FormSection)`
  word-break: break-word;
`;

interface CharactersSectionProps {
  characters: StrictCharacter<CharacterData>[];
  isInactive?: boolean;
}

export function CharactersSection({
  characters,
  isInactive,
}: CharactersSectionProps) {
  if (isInactive && !characters.length) {
    return null;
  }

  return (
    <Section
      columns={{ base: 1, sm: 2, md: 3 }}
      isCollapsible={false}
      title={`${isInactive ? 'Inactive ' : ''}Characters`}
    >
      {characters.length ? (
        characters.map((c) => (
          <ListItem key={c.id}>
            <ProfileCharacterListItem
              character={c}
              isInactive={Boolean(isInactive)}
            />
          </ListItem>
        ))
      ) : (
        <Text as="p" variant="body">
          No characters for this user.
        </Text>
      )}
    </Section>
  );
}

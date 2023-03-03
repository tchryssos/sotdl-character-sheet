import styled from '@emotion/styled';

import { useBreakpointsIsGreaterThan } from '~/logic/hooks/useBreakpoints';
import { StrictCharacter } from '~/typings/characters';

import { FormSection } from '../form/FormSection';
import { Text } from '../Text';
import { ProfileCharacterListItem } from './ProfileCharacterListItem';

const ListItem = styled.li`
  width: 100%;
`;

const Section = styled(FormSection)`
  word-break: break-word;
`;

interface CharactersSectionProps {
  characters: StrictCharacter[];
}

export function CharactersSection({ characters }: CharactersSectionProps) {
  const greaterThanXxs = useBreakpointsIsGreaterThan('xxs');
  const greaterThanSm = useBreakpointsIsGreaterThan('sm');

  return (
    <Section
      canToggleVisibility={false}
      // eslint-disable-next-line no-nested-ternary
      columns={greaterThanXxs ? (greaterThanSm ? 3 : 2) : 1}
      title="Characters"
    >
      {characters.length ? (
        characters.map((c) => (
          <ListItem key={c.id}>
            <ProfileCharacterListItem character={c} />
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

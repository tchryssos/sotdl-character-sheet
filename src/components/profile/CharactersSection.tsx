import styled from '@emotion/styled';

import {
  useBreakpointsAtLeast,
  useBreakpointsIsGreaterThan,
} from '~/logic/hooks/useBreakpoints';
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
}

export function CharactersSection({ characters }: CharactersSectionProps) {
  const greaterThanSm = useBreakpointsIsGreaterThan('sm');
  const atLeastSm = useBreakpointsAtLeast('sm');

  let columns = 1;

  if (atLeastSm) {
    if (greaterThanSm) {
      columns = 3;
    } else {
      columns = 2;
    }
  }

  return (
    <Section columns={columns} isCollapsible={false} title="Characters">
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

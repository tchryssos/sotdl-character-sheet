import styled from '@emotion/styled';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { FormSection } from '~/components/form/FormSection';
import { Link } from '~/components/Link';
import { LoadingPageSpinner } from '~/components/LoadingSpinner';
import { Layout } from '~/components/meta/Layout';
import { ProfileNav } from '~/components/nav/ProfileNav';
import { Text } from '~/components/Text';
import { createCharacterRoute } from '~/constants/routing/shared';
import { fetchUserCharacters } from '~/logic/api/client/fetchUserCharacters';
import { useBreakpointsIsGreaterThan } from '~/logic/hooks/useBreakpoints';
import { StrictCharacter } from '~/typings/characters';
import { isSuccessfulUserCharactersResponse } from '~/typings/user.guards';

import FourOhFour from '../404';

const ProfileWrapper = styled(GridBox)`
  width: 100%;
`;

const CharactersSection = styled(FormSection)`
  word-break: break-word;
`;

const CharacterLink = styled(Link)`
  padding: ${({ theme }) => theme.spacing[4]};
  border: ${({ theme }) =>
    `${theme.borderWidth[1]} solid ${theme.colors.accentLight}`};
`;

const Caps = styled.span`
  text-transform: uppercase;
`;

function ProfilePage() {
  const {
    query: { id },
  } = useRouter();
  const [characters, setCharacters] = useState<StrictCharacter[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const greaterThanXxs = useBreakpointsIsGreaterThan('xxs');
  const greaterThanSm = useBreakpointsIsGreaterThan('sm');

  useEffect(() => {
    if (id) {
      const loadProfile = async () => {
        setIsLoading(true);
        const resp = await fetchUserCharacters(id as string);
        if (isSuccessfulUserCharactersResponse(resp)) {
          setCharacters(resp as StrictCharacter[]);
        }
        setIsLoading(false);
      };

      loadProfile();
    }
  }, [id]);

  if (!isLoading && !characters) {
    return <FourOhFour />;
  }

  return (
    <Layout meta="rpg sheet profile" title="Profile">
      {isLoading || !characters ? (
        <LoadingPageSpinner title="Profile loading" titleId="profile-loading" />
      ) : (
        <>
          <ProfileNav />
          <ProfileWrapper columns={1}>
            <CharactersSection
              canToggleVisibility={false}
              // eslint-disable-next-line no-nested-ternary
              columns={greaterThanXxs ? (greaterThanSm ? 3 : 2) : 1}
              title="Characters"
            >
              {characters.length ? (
                characters.map((c) => {
                  const { level, ancestry } = c.characterData;
                  return (
                    <CharacterLink
                      href={createCharacterRoute(c.id, c.rulebookName)}
                      key={c.id}
                    >
                      <FlexBox flexDirection="column">
                        <FlexBox>
                          <Text as="span" variant="body">
                            {c.name}
                          </Text>
                        </FlexBox>
                        <Text as="p" variant="body-sm">
                          <Caps>{c.rulebookName}</Caps>
                          {level !== undefined || ancestry ? ' - ' : ''}
                          {level !== undefined ? `Level ${level} ` : ''}
                          {`${ancestry ? `${ancestry}` : ''}`}
                        </Text>
                      </FlexBox>
                    </CharacterLink>
                  );
                })
              ) : (
                <Text as="p" variant="body">
                  No characters for this user.
                </Text>
              )}
            </CharactersSection>
          </ProfileWrapper>
        </>
      )}
    </Layout>
  );
}

export default ProfilePage;

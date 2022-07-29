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
import { Body } from '~/components/typography/Body';
import { SubBody } from '~/components/typography/SubBody';
import { createCharacterRoute } from '~/constants/routing/shared';
import { fetchProfileCharacters } from '~/logic/api/client/fetchProfileCharacters';
import { useBreakpointsIsGreaterThan } from '~/logic/hooks/useBreakpoints';
import { StrictCharacter } from '~/typings/characters';
import { isSuccessfulProfileCharactersResponse } from '~/typings/profiles.guards';

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
    `${theme.border.borderWidth[1]} solid ${theme.colors.accentLight}`};
`;

const ProfilePage = () => {
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
        const resp = await fetchProfileCharacters(id as string);
        if (isSuccessfulProfileCharactersResponse(resp)) {
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
                    <CharacterLink href={createCharacterRoute(c.id)} key={c.id}>
                      <FlexBox column>
                        <FlexBox>
                          <Body>{c.name}</Body>
                          <Body>{c.characterData.type}</Body>
                        </FlexBox>
                        {level !== undefined && (
                          <SubBody>
                            {level !== undefined ? `Level ${level}` : ''}
                            {level && ancestry ? ' ' : ''}
                            {`${ancestry ? `${ancestry}` : ''}`}
                          </SubBody>
                        )}
                      </FlexBox>
                    </CharacterLink>
                  );
                })
              ) : (
                <Body>No characters for this user.</Body>
              )}
            </CharactersSection>
          </ProfileWrapper>
        </>
      )}
    </Layout>
  );
};

export default ProfilePage;

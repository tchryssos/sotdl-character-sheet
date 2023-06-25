import { useUser } from '@auth0/nextjs-auth0';
import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

import { Box } from '~/components/box/Box';
import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { IconButton } from '~/components/buttons/IconButton';
import { Gear } from '~/components/icons/Gear';
import { RpgIcon } from '~/components/icons/RpgIcon';
import { Link } from '~/components/Link';
import { Layout } from '~/components/meta/Layout';
import { ProfileNav } from '~/components/nav/ProfileNav';
import { CharactersSection } from '~/components/profile/CharactersSection';
import { Text } from '~/components/Text';
import { US_SHORT_DATE_FORMAT } from '~/constants/dates';
import { RpgIcons } from '~/constants/icons';
import { SETTINGS_ROUTE } from '~/constants/routing/client';
import { useBreakpointsLessThan } from '~/logic/hooks/useBreakpoints';
import { getIconIdxFromUrl } from '~/logic/user';
import { prisma } from '~/logic/utils/prisma';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { CharacterData, StrictCharacter } from '~/typings/characters';
import { StrictSessionUser, StrictUser } from '~/typings/user';

import FourOhFour from '../404';

interface ProfilePageProps {
  userMeta?: Pick<
    StrictUser,
    'createdOn' | 'isPaid' | 'imageUrl' | 'displayName' | 'id'
  >;
  userCharacters: StrictCharacter<CharacterData>[];
}

const iconSize = 64;
const smIconSize = 48;
const premiumSize = 16;

function ProfilePage({ userMeta, userCharacters }: ProfilePageProps) {
  const [iconIdx, setIconIdx] = useState(getIconIdxFromUrl(userMeta?.imageUrl));
  const { user } = useUser();

  const isXss = useBreakpointsLessThan('xs');

  useEffect(() => {
    if (userMeta?.imageUrl) {
      setIconIdx(getIconIdxFromUrl(userMeta.imageUrl));
    }
  }, [userMeta?.imageUrl]);

  if (!userMeta) {
    return <FourOhFour />;
  }

  return (
    <Layout meta="rpg sheet profile" title="Profile">
      <ProfileNav />
      <GridBox columns={1} gap={16} width="100%">
        <GridBox
          alignItems="center"
          gap={16}
          gridTemplateColumns="auto 1fr auto"
          overflow="hidden"
        >
          <Box
            height={pxToRem(isXss ? smIconSize : iconSize)}
            width={pxToRem(isXss ? smIconSize : iconSize)}
          >
            <RpgIcon iconIndex={String(iconIdx) as `${number}`} />
          </Box>

          <FlexBox flexDirection="column" gap={4} overflow="hidden">
            <Text
              as="h1"
              overflow="hidden"
              textOverflow="ellipsis"
              variant="title"
            >
              {userMeta.displayName || 'Anonymous'}
            </Text>
            <FlexBox flexDirection={isXss ? 'row' : 'column'} gap={4}>
              {userMeta.isPaid && (
                <FlexBox alignItems="center" gap={4}>
                  <Box
                    height={pxToRem(premiumSize)}
                    width={pxToRem(premiumSize)}
                  >
                    <RpgIcon iconIndex={RpgIcons.Diamond} />
                  </Box>
                  {!isXss && (
                    <Text as="p" variant="body-xs">
                      Premium
                    </Text>
                  )}
                </FlexBox>
              )}
              <Text as="p" variant="body-xs">
                Joined {format(userMeta.createdOn, US_SHORT_DATE_FORMAT)}
              </Text>
            </FlexBox>
          </FlexBox>
          {(user as StrictSessionUser)?.id === userMeta?.id && (
            <Box marginLeft="auto">
              <Link href={SETTINGS_ROUTE} isInternal>
                <IconButton buttonLike>
                  <Gear title="Profile settings" />
                </IconButton>
              </Link>
            </Box>
          )}
        </GridBox>
        <CharactersSection characters={userCharacters} />
      </GridBox>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<{ props: ProfilePageProps }> => {
  // Character
  const { params } = context;

  let user: StrictUser | undefined;
  let userCharacters: StrictCharacter<CharacterData>[] = [];

  if (params?.id) {
    const parsedId = parseInt(params.id as string, 10);

    if (!Number.isNaN(parsedId)) {
      const dbUser = await prisma.user.findUnique({
        where: {
          id: parseInt(params.id as string, 10),
        },
      });
      if (dbUser) {
        user = dbUser as StrictUser;
        userCharacters = ((await prisma.character.findMany({
          where: {
            playerId: user.id,
            deleted: false,
          },
          orderBy: [
            {
              createdOn: 'asc',
            },
          ],
        })) || []) as StrictCharacter<CharacterData>[];
      }
    }
  }

  return {
    props: {
      userMeta: user
        ? {
            createdOn: user.createdOn,
            isPaid: user.isPaid,
            imageUrl: user.imageUrl,
            displayName: user.displayName,
            id: user.id,
          }
        : undefined,
      userCharacters,
    },
  };
};

export default ProfilePage;

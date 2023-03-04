import { format } from 'date-fns';
import { padStart, random } from 'lodash';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

import { Box } from '~/components/box/Box';
import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { RpgIcon } from '~/components/icons/RpgIcon';
import { Layout } from '~/components/meta/Layout';
import { ProfileNav } from '~/components/nav/ProfileNav';
import { CharactersSection } from '~/components/profile/CharactersSection';
import { Text } from '~/components/Text';
import { US_SHORT_DATE_FORMAT } from '~/constants/dates';
import { RpgIcons } from '~/constants/icons';
import { prisma } from '~/logic/utils/prisma';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { StrictCharacter } from '~/typings/characters';
import { StrictUser } from '~/typings/user';

import FourOhFour from '../404';

interface ProfilePageProps {
  userMeta?: Pick<
    StrictUser,
    'createdOn' | 'isPaid' | 'imageUrl' | 'displayName'
  >;
  userCharacters: StrictCharacter[];
}

const iconSize = 64;
const premiumSize = 16;

// For now, all image urls are one of the pre-defined icon images
// so we just look for the 3 digit icon image code in the url
// and use that for our RpgIcon component
const getIconIdx = (imageUrl?: string) => {
  if (imageUrl) {
    const iconIdx = imageUrl.match(/\d{3}/)?.[0];
    if (iconIdx) {
      return iconIdx;
    }
  }
  return padStart(String(random(0, 440)), 3, '0');
};

function ProfilePage({ userMeta, userCharacters }: ProfilePageProps) {
  const [iconIdx] = useState(getIconIdx(userMeta?.imageUrl));

  if (!userMeta) {
    return <FourOhFour />;
  }

  return (
    <Layout meta="rpg sheet profile" title="Profile">
      <ProfileNav />
      <GridBox columns={1} gap={16} width="100%">
        <FlexBox alignItems="center" gap={16}>
          <Box height={pxToRem(iconSize)} width={pxToRem(iconSize)}>
            <RpgIcon iconIndex={String(iconIdx) as `${number}`} />
          </Box>

          <FlexBox flexDirection="column" gap={4}>
            <Text as="h1" variant="title">
              {userMeta.displayName || 'Anonymous'}
            </Text>
            {userMeta.isPaid && (
              <FlexBox alignItems="center" gap={4}>
                <Box height={pxToRem(premiumSize)} width={pxToRem(premiumSize)}>
                  <RpgIcon iconIndex={RpgIcons.Diamond} />
                </Box>
                <Text as="p" variant="body-xs">
                  Premium
                </Text>
              </FlexBox>
            )}
            <Text as="p" variant="body-xs">
              Joined {format(userMeta.createdOn, US_SHORT_DATE_FORMAT)}
            </Text>
          </FlexBox>
        </FlexBox>
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
  let userCharacters: StrictCharacter[] = [];

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
        })) || []) as StrictCharacter[];
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
          }
        : undefined,
      userCharacters,
    },
  };
};

export default ProfilePage;

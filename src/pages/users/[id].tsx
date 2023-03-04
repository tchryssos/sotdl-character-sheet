import { format } from 'date-fns';
import { GetServerSideProps } from 'next';

import { Box } from '~/components/box/Box';
import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { RpgIcon } from '~/components/icons/RpgIcon';
import { Layout } from '~/components/meta/Layout';
import { ProfileNav } from '~/components/nav/ProfileNav';
import { CharactersSection } from '~/components/profile/CharactersSection';
import { Text } from '~/components/Text';
import { US_SHORT_DATE_FORMAT } from '~/constants/dates';
import { prisma } from '~/logic/utils/prisma';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { StrictCharacter } from '~/typings/characters';
import { StrictUser } from '~/typings/user';

import FourOhFour from '../404';

interface ProfilePageProps {
  userMeta?: Pick<StrictUser, 'createdOn' | 'isPaid'>;
  userCharacters: StrictCharacter[];
}

const iconSize = 64;

function ProfilePage({ userMeta, userCharacters }: ProfilePageProps) {
  if (!userMeta) {
    return <FourOhFour />;
  }

  return (
    <Layout meta="rpg sheet profile" title="Profile">
      <ProfileNav />
      <GridBox columns={1} gap={16} width="100%">
        <FlexBox alignItems="center" gap={16}>
          <Box height={pxToRem(iconSize)} width={pxToRem(iconSize)}>
            <RpgIcon iconIndex="000" />
          </Box>

          <FlexBox flexDirection="column" gap={8}>
            <Text as="h1" variant="title">
              Doggy Man
            </Text>
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
          }
        : undefined,
      userCharacters,
    },
  };
};

export default ProfilePage;

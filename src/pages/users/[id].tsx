import { GetServerSideProps } from 'next';

import { GridBox } from '~/components/box/GridBox';
import { Layout } from '~/components/meta/Layout';
import { ProfileNav } from '~/components/nav/ProfileNav';
import { CharactersSection } from '~/components/profile/CharactersSection';
import { prisma } from '~/logic/utils/prisma';
import { StrictCharacter } from '~/typings/characters';
import { StrictUser } from '~/typings/user';

import FourOhFour from '../404';

interface ProfilePageProps {
  userMeta?: Pick<StrictUser, 'createdOn' | 'isPaid'>;
  userCharacters: StrictCharacter[];
}

function ProfilePage({ userMeta, userCharacters }: ProfilePageProps) {
  if (!userMeta) {
    return <FourOhFour />;
  }

  return (
    <Layout meta="rpg sheet profile" title="Profile">
      <ProfileNav />
      <GridBox columns={1} width="100%">
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

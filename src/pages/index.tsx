import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';

import { AuthLink } from '~/components/AuthLink';
import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { TextButton } from '~/components/buttons/TextButton';
import { Divider } from '~/components/Divider';
import { Link } from '~/components/Link';
import { LogoAscii } from '~/components/LogoAscii';
import { Layout } from '~/components/meta/Layout';
import { HomeNav } from '~/components/nav/HomeNav';
import { Pane } from '~/components/Pane';
// import { Body } from '~/components/typography/Body';
import { Title } from '~/components/typography/Title';
import {
  createCharacterSheetRoute,
  createProfileRoute,
  NEW_CHARACTER_ID,
} from '~/constants/routing';

const HomeWrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const HomePane = styled(Pane)(({ theme }) => ({
  [theme.breakpoints.xxs]: {
    border: 'none',
  },
}));

const ButtonWrapper = styled(GridBox)`
  width: 100%;
`;

const CreateButton = styled(TextButton)`
  width: 100%;
`;

const Logo = styled(LogoAscii)`
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

// const MadeBy = styled(Body)`
//   align-self: flex-start;
//   color: ${({ theme }) => theme.colors.accentLight};
// `;

const Home: React.FC = () => {
  const { user, isLoading, error } = useUser();
  return (
    <Layout
      meta="A collection of online ttrpg character sheets"
      title="rpg sheet"
    >
      <HomeNav />
      <HomeWrapper alignItems="flex-start" justifyContent="center">
        <HomePane>
          <Logo />
          <Title mb={16}>rpg sheet dot&nbsp;games</Title>
          <ButtonWrapper columns={1} rowGap={8}>
            {!isLoading && !error && (
              <>
                {user ? (
                  <Link href={createProfileRoute(user.id)}>
                    <TextButton buttonLike label="My Characters" />
                  </Link>
                ) : (
                  <AuthLink type="login">
                    <TextButton buttonLike label="Authenticate" />
                  </AuthLink>
                )}
                <Divider label="or" />
              </>
            )}
            <Link href={createCharacterSheetRoute(NEW_CHARACTER_ID)}>
              <CreateButton buttonLike label="Create a Character" />
            </Link>
          </ButtonWrapper>
        </HomePane>
      </HomeWrapper>
      {/* <MadeBy mb={8} variant="decorative">
        Created by Troy Chryssos
      </MadeBy> */}
    </Layout>
  );
};
export default Home;

import { useUser } from '@auth0/nextjs-auth0';
import styled from '@emotion/styled';

import { LogoAscii } from '~/components/ascii/LogoAscii';
import { AuthLink } from '~/components/AuthLink';
import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { TextButton } from '~/components/buttons/TextButton';
import { Divider } from '~/components/Divider';
import { Link } from '~/components/Link';
import { LoadingSpinner } from '~/components/LoadingSpinner';
import { Layout } from '~/components/meta/Layout';
import { HomeNav } from '~/components/nav/HomeNav';
import { Pane } from '~/components/Pane';
import { Text } from '~/components/Text';
import {
  CREATE_ID,
  createCharacterRoute,
  createUsersRoute,
} from '~/constants/routing/shared';
import { StrictSessionUser } from '~/typings/user';

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

const AuthLoading = styled(LoadingSpinner)`
  height: ${({ theme }) => theme.spacing[40]};
`;

const Logo = styled(LogoAscii)`
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

function Home() {
  const { user, error, isLoading } = useUser();
  return (
    <Layout
      meta="A collection of online ttrpg character sheets"
      title="rpg sheet"
    >
      <HomeNav />
      <HomeWrapper alignItems="flex-start" justifyContent="center">
        <HomePane>
          <Logo />
          <Text as="h1" marginBottom={16} variant="title-lg">
            rpg sheet dot&nbsp;games
          </Text>
          {isLoading ? (
            <AuthLoading title="Auth loading" titleId="auth-loading" />
          ) : (
            <ButtonWrapper columns={1} rowGap={8}>
              <Link href={createCharacterRoute(CREATE_ID)}>
                <TextButton buttonLike label="Create a Character" />
              </Link>
              {!error && (
                <>
                  <Divider label="or" />
                  {user ? (
                    <Link
                      href={createUsersRoute((user as StrictSessionUser).id)}
                    >
                      <TextButton buttonLike label="My Characters" />
                    </Link>
                  ) : (
                    <AuthLink type="login">
                      <TextButton buttonLike label="Authenticate" />
                    </AuthLink>
                  )}
                </>
              )}
            </ButtonWrapper>
          )}
        </HomePane>
      </HomeWrapper>
    </Layout>
  );
}
export default Home;

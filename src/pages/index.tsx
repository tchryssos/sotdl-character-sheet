import styled from '@emotion/styled';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { TextButton } from '~/components/buttons/TextButton';
import { Divider } from '~/components/Divider';
import { Link } from '~/components/Link';
import { LogoAscii } from '~/components/LogoAscii';
import { Layout } from '~/components/meta/Layout';
import { Pane } from '~/components/Pane';
import { Title } from '~/components/typography/Title';

const HomeWrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled(GridBox)`
  width: 100%;
`;

const CreateButton = styled(TextButton)`
  width: 100%;
`;

const Home: React.FC = () => (
  <Layout
    meta="A collection of online ttrpg character sheets"
    title="Character Sheets"
  >
    <HomeWrapper center>
      <Pane>
        <LogoAscii />
        <Title mb={16}>rpg sheet dot games</Title>
        <ButtonWrapper columns={1} rowGap={8}>
          <GridBox columnGap={8}>
            <TextButton label="Log In" transparent />
            <TextButton label="Create Account" />
          </GridBox>
          <Divider label="or" />
          <Link href="/games">
            <CreateButton label="Create a Character" onClick={() => null} />
          </Link>
        </ButtonWrapper>
      </Pane>
    </HomeWrapper>
  </Layout>
);

export default Home;

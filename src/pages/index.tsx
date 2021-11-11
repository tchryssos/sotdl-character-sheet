import styled from '@emotion/styled';

import { Box } from '~/components/box/Box';
import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { TextButton } from '~/components/buttons/TextButton';
import { Link } from '~/components/Link';
import { Layout } from '~/components/meta/Layout';
import { Body } from '~/components/typography/Body';
import { Title } from '~/components/typography/Title';
import { SCIMITAR } from '~/constants/ascii';
import { pxToRem } from '~/utils/styles';

const HomeWrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const AsciiText = styled.pre(({ theme }) => ({
  color: theme.colors.text,
  fontSize: pxToRem(6),
  marginBottom: theme.spacing[8],
}));

const HomePane = styled(FlexBox)(({ theme }) => ({
  borderColor: theme.colors.accentLight,
  borderWidth: theme.border.borderWidth[1],
  borderRadius: theme.spacing[4],
  borderStyle: 'solid',
  boxShadow: `${pxToRem(6)} ${pxToRem(4)} ${theme.colors.accentHeavy}`,
}));

const ButtonWrapper = styled(GridBox)`
  width: 100%;
`;

const Home: React.FC = () => (
  <Layout
    meta="A collection of online ttrpg character sheets"
    title="Character Sheets"
  >
    <HomeWrapper center>
      <HomePane center column px={24} py={16}>
        <figure aria-label="ascii art scimitar" role="img">
          <AsciiText>{SCIMITAR}</AsciiText>
        </figure>
        <Title mb={16}>rpg sheet dot games</Title>
        <ButtonWrapper columns={1} rowGap={8}>
          <TextButton label="Log In" />
          <Body>or</Body>
          <TextButton label="Create a Character" />
        </ButtonWrapper>
      </HomePane>
    </HomeWrapper>
  </Layout>
);

export default Home;

import styled from '@emotion/styled';
import Image from 'next/image';

import { Box } from '~/components/box/Box';
import { FlexBox } from '~/components/box/FlexBox';
import { Link } from '~/components/Link';
import { Layout } from '~/components/meta/Layout';
import { Body } from '~/components/typography/Body';
import { Title } from '~/components/typography/Title';

const HomeWrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const HomePane = styled(FlexBox)(({ theme }) => ({
  borderColor: theme.colors.accentLight,
  borderWidth: theme.border.borderWidth[3],
  borderStyle: 'solid',
  padding: theme.spacing[8],
}));

const Home: React.FC = () => (
  <Layout
    meta="A collection of online ttrpg character sheets"
    title="Character Sheets"
  >
    <HomeWrapper center>
      <HomePane center column>
        <Image
          alt="RPG Sheet logo"
          height={80}
          layout="fixed"
          src="/logo_tome.png"
          width={80}
        />
        <Title>RPG Sheet dot games</Title>
      </HomePane>
    </HomeWrapper>
  </Layout>
);

export default Home;

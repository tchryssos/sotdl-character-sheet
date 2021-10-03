// import styled from '@emotion/styled';
import { FlexBox } from '~/components/box/FlexBox';
import { CharacterForm } from '~/components/CharacterForm';
import { Layout } from '~/components/meta/Layout';

const Home: React.FC = () => (
  <Layout>
    <FlexBox center flex={1}>
      <CharacterForm />
    </FlexBox>
  </Layout>
);

// eslint-disable-next-line import/no-default-export
export default Home;

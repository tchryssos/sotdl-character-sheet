// import styled from '@emotion/styled';
import { FlexBox } from '~/components/box/FlexBox';
import { CharacterForm } from '~/components/CharacterForm';
import { Layout } from '~/components/meta/Layout';

const SOTDL: React.FC = () => (
  <Layout
    meta="A character sheet for Shadow of the Demon Lord"
    title="Shadow of the Demon Lord"
  >
    <FlexBox center flex={1}>
      <CharacterForm />
    </FlexBox>
  </Layout>
);

// eslint-disable-next-line import/no-default-export
export default SOTDL;

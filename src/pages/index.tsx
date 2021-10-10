import { FlexBox } from '~/components/box/FlexBox';
import { Link } from '~/components/Link';
import { Layout } from '~/components/meta/Layout';
import { Body } from '~/components/typography/Body';

const Home: React.FC = () => (
  <Layout>
    <FlexBox center flex={1} py={16}>
      <Link href="/sotdl" isInternal>
        <Body>Shadow of the Demon Lord</Body>
      </Link>
    </FlexBox>
  </Layout>
);

// eslint-disable-next-line import/no-default-export
export default Home;

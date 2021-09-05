import { useContext } from 'react';

import Layout from '~/components/meta/Layout';
import Body from '~/components/typography/Body';
import { BreakpointsContext } from '~/logic/contexts/breakpointsContext';

const Home: React.FC = () => {
  const breakpoints = useContext(BreakpointsContext);
  return (
    <Layout>
      <Body>
        Welcome to Next JS! Edit src/pages/index.tsx to get started...
      </Body>
      <Body>
        The current breakpoint is &apos;{breakpoints[breakpoints.length - 1]}
        &apos;
      </Body>
    </Layout>
  );
};

export default Home;

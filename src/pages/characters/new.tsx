import { useContext, useEffect } from 'react';

import { Layout } from '~/components/meta/Layout';
import { NavContext } from '~/logic/contexts/navContext';

const NewCharacterNav: React.FC = () => {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('New Character');
  }, [setNavTitle]);

  return null;
};

const NewCharacterPage: React.FC = () => {
  const test = '';
  return (
    <Layout
      meta="Select a rulebook for your new character"
      title="New Character"
    >
      <NewCharacterNav />
      <span>new</span>
    </Layout>
  );
};

export default NewCharacterPage;

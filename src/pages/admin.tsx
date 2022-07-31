import { useContext, useEffect } from 'react';

import { Roles } from '~/components/admin/Roles';
import { Rulebooks } from '~/components/admin/Rulebooks';
import { FlexBox } from '~/components/box/FlexBox';
import { Layout } from '~/components/meta/Layout';
import { NavContext } from '~/logic/contexts/navContext';
import { useUserIsAdmin } from '~/logic/hooks/useUserIsAdmin';

import FourOhFour from './404';

const AdminNav: React.FC = () => {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('Admin Panel');
  }, [setNavTitle]);

  return null;
};

const AdminPage: React.FC = () => {
  const userIsAdmin = useUserIsAdmin();

  if (typeof userIsAdmin === 'boolean') {
    return userIsAdmin ? (
      <Layout meta="rpgsheet dot games admin console" title="Admin Panel">
        <AdminNav />
        <FlexBox column gap={16} width="100%">
          <Rulebooks />
          <Roles />
        </FlexBox>
      </Layout>
    ) : (
      <FourOhFour />
    );
  }

  return null;
};

export default AdminPage;

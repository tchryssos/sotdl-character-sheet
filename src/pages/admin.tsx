import { useContext, useEffect } from 'react';

import { Rulebooks } from '~/components/admin/Rulebooks';
import { User } from '~/components/admin/User';
import { FlexBox } from '~/components/box/FlexBox';
import { Layout } from '~/components/meta/Layout';
import { NavContext } from '~/logic/contexts/navContext';
import { useUserIsAdmin } from '~/logic/hooks/useUserIsAdmin';

import FourOhFour from './404';

function AdminNav() {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('Admin Panel');
  }, [setNavTitle]);

  return null;
}

function AdminPage() {
  const userIsAdmin = useUserIsAdmin();

  if (typeof userIsAdmin === 'boolean') {
    return userIsAdmin ? (
      <Layout meta="rpgsheet dot games admin console" title="Admin Panel">
        <AdminNav />
        <FlexBox flexDirection="column" gap={16} width="100%">
          <Rulebooks />
          <User />
        </FlexBox>
      </Layout>
    ) : (
      <FourOhFour />
    );
  }

  return null;
}

export default AdminPage;

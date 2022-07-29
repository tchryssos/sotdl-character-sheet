import { useContext, useEffect } from 'react';

import { Roles } from '~/components/admin/Roles';
import { Rulebooks } from '~/components/admin/Rulebooks';
import { Layout } from '~/components/meta/Layout';
import { NavContext } from '~/logic/contexts/navContext';

const AdminNav: React.FC = () => {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('Admin Console');
  }, [setNavTitle]);

  return null;
};

const AdminPage: React.FC = () => (
  <Layout meta="rpgsheet dot games admin console" title="Admin Console">
    <AdminNav />
    <Rulebooks />
    <Roles />
  </Layout>
);

export default AdminPage;

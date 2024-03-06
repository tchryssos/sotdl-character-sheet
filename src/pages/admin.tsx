import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { useContext, useEffect } from 'react';

import { Rulebooks } from '~/components/admin/Rulebooks';
import { User } from '~/components/admin/User';
import { FlexBox } from '~/components/box/FlexBox';
import { Layout } from '~/components/meta/Layout';
import { Roles } from '~/constants/users';
import { NavContext } from '~/logic/contexts/navContext';
import { StrictSessionUser } from '~/typings/user';

function AdminNav() {
  const { setNavTitle } = useContext(NavContext);

  useEffect(() => {
    setNavTitle('Admin Panel');
  }, [setNavTitle]);

  return null;
}

function AdminPage() {
  return (
    <Layout meta="rpgsheet dot games admin console" title="Admin Panel">
      <AdminNav />
      <FlexBox flexDirection="column" gap={16} width="100%">
        <Rulebooks />
        <User />
      </FlexBox>
    </Layout>
  );
}

export default AdminPage;

const gssp: GetServerSideProps = async (context) => {
  const session = getSession(context.req, context.res);
  const { user } = session || {};

  if (!user || !((user as StrictSessionUser).role === Roles.Admin)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: gssp,
});

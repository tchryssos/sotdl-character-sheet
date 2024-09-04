import { GetServerSideProps } from 'next';

function LogoutPage() {
  return null;
}

export default LogoutPage;

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/api/auth/logout',
    permanent: false,
  },
});

import Head from './Head';

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title }) => (
  <div>
    <Head title={title} />
    {children}
  </div>
);

export default Layout;

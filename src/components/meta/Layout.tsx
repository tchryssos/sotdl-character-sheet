import { Head } from './Head';

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

export const Layout: React.FC<LayoutProps> = ({ children, title }) => (
  <>
    <Head title={title} />
    {children}
  </>
);

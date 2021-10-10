import { Head } from './Head';

type LayoutProps = {
  children?: React.ReactNode;
  title: string;
  meta: string;
};

export const Layout: React.FC<LayoutProps> = ({ children, title, meta }) => (
  <>
    <Head meta={meta} title={title} />
    {children}
  </>
);

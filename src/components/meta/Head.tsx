import NextHead from 'next/head';

type HeadProps = {
  title?: string;
};

const Head: React.FC<HeadProps> = ({ title = 'CHANGE ME' }) => (
  <NextHead>
    {/* Uncomment the following lines if using google fonts */}
    {/* <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossOrigin="use-credentials"
  />
  <link rel="dns-prefetch" href="https://fonts.gstatic.com/" /> */}
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta content="initial-scale=1.0, width=device-width" name="viewport" />
    <meta content="Troy Chryssos' Next JS template" name="description" />
  </NextHead>
);

export default Head;

import NextHead from 'next/head';

type HeadProps = {
  title: string;
  meta: string;
};

export const Head: React.FC<HeadProps> = ({
  title = 'Character Sheets',
  meta,
}) => (
  <NextHead>
    <link
      crossOrigin="use-credentials"
      href="https://fonts.gstatic.com"
      rel="preconnect"
    />
    <link href="https://fonts.gstatic.com/" rel="dns-prefetch" />
    <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
    <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
    <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta content="initial-scale=1.0, width=device-width" name="viewport" />
    <meta content={meta} name="description" />
  </NextHead>
);

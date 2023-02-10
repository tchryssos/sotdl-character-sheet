module.exports = {
  eslint: {
    dirs: ['pages', 'utils', 'constants', 'components', 'typings'],
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  // https://github.com/vercel/next.js/issues/13209
  // we have the above issue with our createdOn dates
  experimental: {
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
  },
};

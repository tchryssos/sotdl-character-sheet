# Troy's Next / TS Template

The original `create-next-app` documentation is included as `README.next.md`.
See the [`Next.js` documentation](https://nextjs.org/docs/getting-started) to learn more about `next`.

See the [`typescript` handbook](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) for information about `typescript`.

## Setup

1. clone the repo
1. `yarn` to install packages
1. edit the meta properties
   - name, version, description, author, and deploy command in package.json
   - title and meta description in `src/components/meta/Head.tsx`
   - change the favicon in the `public`

## Running Locally

There are 2 ways to run the app locally:

- `yarn dev`
- `yarn build:serve`

`dev` uses a `development` next.js dev configuration. This is what should be used for regular development (defaults to port 3000).

`build:serve` runs the `build` command to create a production build of the app, then serves that build via a local server (defaults to port 3003). This should be used for things like lighthouse score, etc. You can modify the port used by modifying the value after the `-p` flag for the `build:serve` command in `package.json`.

## Development

Most of the things that could be covered here are probably covered by the `next` docs (linked above), but there are a few configuration things worth touching on:

1. This template includes [`emotion/react`](https://emotion.sh/docs/introduction) and [`emotion/styled`](https://emotion.sh/docs/styled) for css-in-jss styling using the styled component pattern. See the `emotion/styled` documentation for on its usage.
2. For testing, this template inculdes [`jest`](https://jestjs.io/docs/getting-started) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/). Your test files should follow the `Component.test.tsx` naming pattern, which will allow `jest` to find them automatically. Use `yarn test` to run your tests.

## Storybook

Storybook is setup to be fairly plug-and-play assuming you know Storybook already. If not, [head to their site](https://storybook.js.org/docs/react/get-started/introduction) to get the lowdown. Stories should be added to the stories directory and have filenames with the following pattern: `componentName.stories.tsx` or `componentName.stories.mdx` (I recommend installing an `mdx` editor addon if you plan on using `mdx`, which you can read more about [here](https://storybook.js.org/docs/react/writing-docs/mdx)). Whether you use `tsx` or `mdx` for your stories, you can use [doc-blocs](https://storybook.js.org/docs/react/writing-docs/doc-blocks) to enhance those stories. The storybook `addon-docs` comes included with this template.

If the above rules are followed, Storybook should find the files automatically.

## Deploying

Before deploying, run `yarn build` to make a production build of your app, then follow the [Next.js deployment documentation](https://nextjs.org/docs/deployment) to deploy on Vercel.

## TODOs

1. Investigate custom `deploy` command to automate more of the deployment process

# Setup

## 1. Prerequisites:

- [ ]  [**Node**](https://nodejs.org/en/) `≥ 14.0.0`
- [ ]  [**Yarn:**](https://classic.yarnpkg.com/en/docs/install) `npm install -g yarn`
- [ ]  [**Vercel CLI**](https://vercel.com/docs/cli): `npm install -g vercel`

## 2. Monorepo Installation

1. Clone down the repo from Github/Bitbucket `git clone <PROJECT_URL>`
2. Run `yarn install` at the **project root** (not inside the individual package).

### 1. Clone the git repo

`git clone ...`

### 2. Install dependencies

`npm install`

### 3. Run storybook for basic UI development

`npm run storybook`

## Advanced Authoring: Setup local library symlink via `npm link`

Apart from viewing your changes in Storybook, you may also link your local library to develop within your downstream app in order to better develop your component in an integrated environment as your app. Linking your library locally also allows you to avoid constantly publishing the library to view the changes in your app. We will do so via the `npm link` command.

The following outlines the steps required to configure this setup on your local machine:

1. Upon cloning and install the dependencies described in the Installation step above, in the project root of your local lib folder, do `npm link`.
2. We will also need to do the same for your React and React DOM dependencies in order to bypass an error related the downstream app referencing a different React version and causing errors related to React hooks. To do so, in your local lib folder, `cd node_modules/react && npm link && ../react-dom && npm link`.
3. Now in the project root of your downstream app, do `npm link @gravis-os/* react react-dom` to connect your downstream app to your local library.
4. Run your app.
5. For every change you make to the local library, do `npm run build` in the project root of your local library to generate an updated `dist` folder. Restart your app to view the changes.

## **Code Style**

Before committing the code, Git pre-hooks will check staged changes for following the code styles. If you would like to format the code by yourself, run the command: `yarn lint`

## Building and Publishing Local Changes

Always publish from within dist folder as we don't want to have an extra dist wrapper in the import path. The following is a command you should run from the lib root locally to have your changes deployed:

`yarn build; cp package.json dist; cd dist; yalc push; ../`

## Pitfalls

### Dynamic Imports not supported in this library

We are not able to use dynamic imports of any sort in this library to disable SSR. Downstream app will crash with error message similar to: `next_dynamic__WEBPACK_IMPORTED_MODULE_2__ is not a function`. Setting rollup.inlineDynamicImports is a potential option but is not compatible with preserveModules and so is a hard pass. Libraries that require dynamic imports like `react-quill` should be avoided and replaced with SSR-friendly versions such as `react-quilljs` as a workaround at the mmoment.

## Yalc

### Running yarn install in your app breaks yalc

Install new dependencies in your downstream app to an existing yalc connected library locally breaks ccth

## Deployment

Once you’re happy with your changes, commit and push to the `release` branch of `@gravis-os/*` which will

## Publishing

This builds `commonjs`, `esm`, and `umd` versions of your module to `dist/` and then publishes your module to `npm`.
Make sure that any npm modules you want as peer dependencies are properly marked as `peerDependencies` in `package.json`. The rollup config will automatically recognize them as peers and not try to bundle them in your module.

## Authoring Practices

1. Functional code
2. No mutative code
3. Composition over inheritance

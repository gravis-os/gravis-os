# Nova

## Features

- React with TypeScript support
- [Rollup](https://rollupjs.org/) for bundling (with a customizable bundler config file)
- [Babel](https://babeljs.io/) for transpiling
- [Storybook](https://storybook.js.org) for development and component explorer
- [SVGR](https://react-svgr.com/) support
- Linting before commit support with [ESLint](https://eslint.org/), [Husky](https://github.com/typicode/husky) and [Lint Staged](https://github.com/okonet/lint-staged)
- Supports CSS modules configurable with [PostCSS](https://postcss.org/)
- Supports CJS, ESM and UMD formats
- Sourcemap creation

---

## Introduction

Nova is an opinionated library for building modern web applications. It is a library for modern frontend only. Do not use this in a node environment.

## Modern

Assembled in 2022, Nova is a ESM library, supporting tree-shaking by default.

## Why

We spend too much time recreating the same components across libraries.

## Stack

Nova builds on top the following open-source technologies:

1. React
2. MUI
3. Next
4. Supabase

## Peer Dependencies

Nova ships with the following key dependencies which are only injected into your app's bundle size if you use the respective modules thanks to tree-shaking.

Kindly install the following dependencies in your downstream app when using the following modules in the chart below:

### Form

`yarn add react-hook-form react-hot-toast react-quilljs quill react-number-format`

```
// CSS
import 'react-quill/dist/quill.snow.css'
```

#### Other Requirements

1. In app, add `<Toaster position="top-right" reverseOrder={false} />` inside `<ThemeProvider>` in `_app.tsx`

### Storage

`yarn add @supabase/supabase-auth-helpers`

### Auth

`yarn add @supabase/supabase-auth-helpers`

#### Other requirements

1. Add the following to `pages/api/auth/[...supabase].js`

```
import { handleAuth } from '@supabase/supabase-auth-helpers/nextjs'
export default handleAuth()
```

2. Add the following to `_app.tsx` inside the `ThemeProvider`

```
import { AuthProvider } from '@onextech/nova/auth'
```

#### Usage

1. Add the following to pages you need to guard

```
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'

export const getServerSideProps = withAuthRequired()
```

### CMS

`yarn add @supabase/supabase-auth-helpers ag-grid-react ag-grid-community ag-grid-enterprise react-quilljs quill react-query`

#### Other requirements

1. Install deps from `form`, `auth`, `storage`
2. Add the following css to your `_app.tsx`

```
// CSS
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
```

# Supabase Installation

1. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your app's .env file like so:

```
NEXT_PUBLIC_SUPABASE_URL=http://localhost:6006
NEXT_PUBLIC_SUPABASE_ANON_KEY=MOCK
```

## 3rd-Party Dependencies

1. React-quilljs https://github.com/gtgalone/react-quilljs

## Architecture

```
/auth
  // login
  // resetpwd
  // auth provider
/cms
  // crudtable // ag-grid
  // crudlist
  // crudedit
  // crudupdate
/ui
  // Box
  // Stack
/landing
  // Block
/form
  // TextField
  // ControlledTextField
/storage
  // StorageAvatar
  // StorageFileDropzone
/utils
  // printNumber
/config
  // styleConfig
```

## Usage

```
import { Button, Alert, Box } from '@onextech/nova/ui'
import { printNumber } from '@onextech/nova/utils'
```

## Authoring

## Building and Publishing Local Changes

Always publish from within dist folder as we don't want to have an extra dist wrapper in the import path. The following is a command you should run from the lib root locally to have your changes deployed:

`yarn build; cp package.json dist; cd dist; yalc push; ../`

## Pitfalls

### Dynamic Imports not supported in this library

We are not able to use dynamic imports of any sort in this library to disable SSR. Downstream app will crash with error message similar to: `next_dynamic__WEBPACK_IMPORTED_MODULE_2__ is not a function`. Setting rollup.inlineDynamicImports is a potential option but is not compatible with preserveModules and so is a hard pass. Libraries that require dynamic imports like `react-quill` should be avoided and replaced with SSR-friendly versions such as `react-quilljs` as a workaround at the mmoment.

## Yalc

### Running yarn install in your app breaks yalc

Install new dependencies in your downstream app to an existing yalc connected library locally breaks ccth

---

## Development

Clone this repo and run the following commands to start development with Storybook.

```bash
// Install deps
yarn install
npx msw init public/

// Run env
yarn storybook
```

Go to `localhost:6006` and you should see something like this.

![storybook-dev](https://user-images.githubusercontent.com/22829115/101779100-c59f8680-3b2f-11eb-985f-ca2ba37ed1f7.png)

## Building

To build your project, run `yarn build`.

## Publishing

This builds `commonjs`, `esm`, and `umd` versions of your module to `dist/` and then publishes your module to `npm`.
Make sure that any npm modules you want as peer dependencies are properly marked as `peerDependencies` in `package.json`. The rollup config will automatically recognize them as peers and not try to bundle them in your module.

## Source

react-library-starter by [Rhaidzsal Ali](https://github.com/rhaicode)
⚡ A library starter kit and bundler for your React projects, powered by Rollup.

## License

GPL-3.0

# Developer Installation Guide

## 1. Prerequisites:

- [ ]  [**Node**](https://nodejs.org/en/) `≥ 14.0.0`
- [ ]  [**Yarn:**](https://classic.yarnpkg.com/en/docs/install) `npm install -g yarn`
- [ ]  [**Vercel CLI**](https://vercel.com/docs/cli): `npm install -g vercel`
    - [ ]  [Login Vercel CLI](https://vercel.com/docs/cli#commands/login)
- [ ]  [**AWS Amplify CLI**](https://docs.amplify.aws/cli/start/install/): `npm install -g @aws-amplify/cli`
    - [ ]  [Configure Amplify CLI](https://docs.amplify.aws/cli/start/install/#configure-the-amplify-cli)

## 2. Monorepo Installation

1. Clone down the repo from Github/Bitbucket `git clone <PROJECT_URL>`
2. Run `yarn install` at the **project root** (not inside the individual package).

## 3. Vercel Setup

1. `cd` to the relevant package that you’re working on e.g. `cd packages/web` to be in the package root.
2. In the package root, run `vercel link`:
    ```
    Set up “~/iix/packages/web”? [Y/n] y
    Which scope should contain your project? [choose your team]
    Link to existing project? [y/N] y
    What’s the name of your existing project? iix-web
    ```
3.  To get the `.env`, run `vercel env pull`

## 4. Starting the server

1.  `yarn dev` 
2. To run another package, open a new shell and repeat the **Vercel Setup**

## 5. Amplify Setup

1. Go to `packages/api`
2. Run `amplify init` ([link](https://docs.amplify.aws/cli/start/workflows/#initialize-new-project))
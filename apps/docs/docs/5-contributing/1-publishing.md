# Publishing

Deploying Gravis to the NPM registry via [Changesets](https://github.com/changesets/changesets).

## Instructions
1. In the Gravis-OS project root, do `yarn build` to ensure that all builds pass.
2. If you are a first-time publisher, ensure that you have setup `.env` file with your `GITHUB_TOKEN=token_here` in the project root. You’ll need to get a [new Github Personal Access token](https://github.com/settings/tokens/new). Setup your Github Personal Token with permissions: `repo` and `user`.
3. Now do `yarn changeset version`, notice that the CHANGELOGs throughout the updated packages have been automatically updated.
4. If you are a first-time publisher, ensure that your shell contains the npm info by doing `npm whoami`. The expected result is `1xt`. If you do not get this result, do `npm login` . You can find our npm login details from 1Password.
5. Now do `yarn changeset publish` to deploy the changes to the npm registry.
6. Finally, commit your changes with the template commit message: `build(web, api): published changeset` and you’re done.

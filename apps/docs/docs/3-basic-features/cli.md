# Module Generator
_Generate CRUD modules with Gravis via the Gravis CLI._

## Installation
`npm install -g @gravis-os/cli`

:::tip
Run `gravis -v` to print version output to ensure that you have installed the cli successfully.
:::

## Usage

1. Go to the package root of your app.
2. Run `gravis generate <SingularModuleName>` in [pascal case](https://www.notion.so/Generate-CRUD-modules-with-gravis-os-cli-0e3422a9115e496083ede82320c6e69b).
3. Answer the prompt for the plural version of your module name in pascal case as well.
4. Done! Check and update the generated files in `pages` and `src/modules` folder.

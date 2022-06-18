import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      prompt,
      parameters,
      template: { generate },
      print: { info, error },
    } = toolbox
    // Dynamic import deps for better perf
    const { camelCase, startCase, kebabCase } = await import('lodash')

    // 1. Prompt for name if not provided
    // More info on prompter here: $ gluegun kitchen
    // @link https://github.com/infinitered/gluegun/blob/master/docs/toolbox-prompt.md
    const getNameOrPrompt = async (name?: string) => {
      if (!name) {
        const result = await prompt.ask({
          type: 'input',
          name: 'name',
          message: 'What is the name of the module?',
        })
        if (result && result.name) return result.name
        // if they didn't provide one, we error out
        if (!result.name) {
          error('No name specified!')
          return
        }
      }

      return name
    }
    const name = await getNameOrPrompt(parameters.first)

    // We got all that we need. Prepare inputs.
    const module = {
      name: {
        camelCase: camelCase(name), // projectGroup
        titleCase: startCase(name).replace(' ', ''), // ProjectGroup
        kebabCase: kebabCase(name), // project-group
      },
    }
    const commonProps = { props: { name } }
    const templateFolder = 'CrudGen'

    const files = [
      {
        template: 'pages/modules/index.tsx.ejs',
        target: `pages/${module.name.kebabCase}s/index.tsx`,
      },
      {
        template: 'pages/modules/[slug].tsx.ejs',
        target: `pages/${module.name.kebabCase}s/[slug].tsx`,
      },
      {
        template: 'src/modules/Module/__tests__/module.test.jsx.ejs',
        target: `src/modules/${module.name.titleCase}/__tests__/${module.name.camelCase}.test.jsx`,
      },
      {
        template: 'src/modules/Module/moduleConfig.ts.ejs',
        target: `src/modules/${module.name.titleCase}/${module.name.camelCase}Config.ts`,
      },
    ]

    const generatePromises = files.reduce((acc, file) => {
      const template = `${templateFolder}/${file.template}`

      // Where to copy this file to.
      const target = file.target.replace('.ejs', '')

      /*
        First argument is the template,
        Second is the target, where to put the file
        The third is the argument to be passed into the file
        returns a promise
      */
      const gen = generate({ ...commonProps, template, target })

      return acc.concat([gen])
    }, [])

    await Promise.all(generatePromises)

    // Thank you.
    info(`Generated new ${module.name.titleCase} module.`)
  },
}

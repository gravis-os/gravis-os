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
    const { camelCase, startCase, kebabCase, snakeCase } = await import(
      'lodash'
    )

    // 1. Prompt for name if not provided
    // More info on prompter here: $ gluegun kitchen
    // @link https://github.com/infinitered/gluegun/blob/master/docs/toolbox-prompt.md
    const getOrPromptSingularName = async () => {
      const result = await prompt.ask({
        type: 'input',
        name: 'name',
        message:
          'What is the singular name of the module? (in TitleCase with no spaces) e.g. ProjectGroup',
      })

      // if they didn't provide one, we error out
      if (!result.name) return error('No name specified!')

      return result.name
    }

    const singularName = parameters.first || (await getOrPromptSingularName())

    // Plural name
    const promptPluralName = async () => {
      const result = await prompt.ask({
        type: 'input',
        name: 'pluralName',
        message:
          'What is the plural name of the module? (in TitleCase with no spaces) e.g. ProjectGroups',
      })

      // if they didn't provide one, we error out
      if (!result.pluralName) return error('No plural name specified!')

      return result.pluralName
    }
    const pluralName = await promptPluralName()

    // ==============================
    // Validate inputs
    // ==============================
    if (!singularName || !pluralName) return

    // ==========================================
    // We got all that we need. Prepare inputs.
    // ==========================================
    const getNameWithCasings = (name: string) => ({
      camelCase: camelCase(name), // projectGroup
      titleCase: startCase(name).replace(' ', ''), // ProjectGroup
      kebabCase: kebabCase(name), // project-group
      lowerSnakeCase: snakeCase(name).toLowerCase(), // project_group
      upperSnakeCase: snakeCase(name).toUpperCase(), // PROJECT_GROUP
      startCase: startCase(name), // Project Group
    })
    const module = {
      name: getNameWithCasings(singularName),
      pluralName: getNameWithCasings(pluralName || singularName),
    }
    const commonProps = { props: { name: singularName, module } }
    const templateFolder = 'CrudGen'

    const files = [
      {
        template: 'pages/modules/index.tsx.ejs',
        target: `pages/dashboard/${module.name.kebabCase}s/index.tsx`,
      },
      {
        template: 'pages/modules/[slug].tsx.ejs',
        target: `pages/dashboard/${module.name.kebabCase}s/[slug].tsx`,
      },
      {
        template: 'src/modules/Module/__tests__/module.test.jsx.ejs',
        target: `src/modules/${module.name.titleCase}/__tests__/${module.name.camelCase}.test.jsx`,
      },
      {
        template: 'src/modules/Module/moduleConfig.tsx.ejs',
        target: `src/modules/${module.name.titleCase}/${module.name.camelCase}Config.tsx`,
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

import { GluegunToolbox } from 'gluegun'
import { camelCase, startCase, kebabCase } from 'lodash'

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

    // Handle case where name is not provided.

    const module = {
      name: {
        camelCase: camelCase(name), // projectGroup
        titleCase: startCase(name).replace(' ', ''), // ProjectGroup
        kebabCase: kebabCase(name), // project-group
      },
    }

    const commonProps = { props: { name } }

    const generatePromises = [
      // Generate config file
      generate({
        ...commonProps,
        template: 'moduleConfig.ts.ejs',
        target: `src/modules/${module.name.titleCase}/${module.name.camelCase}Config.ts`,
      }),
    ]

    await Promise.all(generatePromises)

    info(`Generated new ${module.name.titleCase} module.`)
  },
}

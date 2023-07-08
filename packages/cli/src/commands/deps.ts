module.exports = {
  description: 'Manage @gravis-os dependencies in your downstream app.',
  run: async (toolbox) => {
    const { options } = toolbox.parameters

    switch (true) {
      // $ gravis deps --dedupe
      case Boolean(options.dedupe):
        const onDedupe = await toolbox.system.run(
          `npx yarn-deduplicate --strategy highest --scopes @gravis-os`
        )
        return toolbox.print.info(onDedupe)
      // $ gravis deps --upgrade
      case Boolean(options.upgrade):
        const onUpgrade = await toolbox.system.run(
          `echo "a" | yarn upgrade-interactive --latest --scope @gravis-os`
        )
        return toolbox.print.info(onUpgrade)
      default:
        return toolbox.print.info(
          'Error: Please pass in a valid option to this command.'
        )
    }
  },
}

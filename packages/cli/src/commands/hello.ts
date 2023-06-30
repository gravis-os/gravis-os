module.exports = {
  description: 'A Hello world command for debugging purposes.',
  run: async (toolbox) => {
    toolbox.print.info('Hello, world!')
  },
}

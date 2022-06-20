import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')

const cli = async (cmd) =>
  system.run(`node ${filesystem.path(src, 'bin', 'gravis')} ${cmd}`)

test('outputs version', async () => {
  const output = await cli('--version')
  expect(output).toContain('0.0.1')
})

test('outputs help', async () => {
  const output = await cli('--help')
  expect(output).toContain('0.0.1')
})

test('generates file', async () => {
  const output = await cli('generate Foo Foos')

  expect(output).toContain('Generated new Foo module.')
  const fooConfig = filesystem.read('src/modules/Foo/fooConfig.tsx')

  expect(fooConfig).toContain(`export const fooModule = {`)
  expect(fooConfig).toContain(`name: 'foo'`)

  // cleanup artifact
  filesystem.remove('pages/dashboard/foos')
  filesystem.remove('src/modules/Foo')
})

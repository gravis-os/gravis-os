/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw'

const handlers = {
  api: [
    rest.get('/rest/v1/contact', (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: 1,
            title: 'Tim Cook',
            slug: 'tim-cook',
          },
        ])
      )
    }),
  ],
  auth: [
    rest.get('/api/auth/user', (req, res, ctx) => {
      return res(
        ctx.json({
          accessToken: '',
          error: false,
          isLoading: false,
          user: { id: 1, name: 'John Doe' },
        })
      )
    }),
  ],
}

export default handlers

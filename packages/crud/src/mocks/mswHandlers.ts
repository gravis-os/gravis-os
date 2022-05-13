/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw'

const handlers = {
  auth: [
    rest.get('/api/auth/user', (req, res, ctx) => {
      return res(
        ctx.json({
          isLoading: false,
          error: false,
          accessToken: '',
          user: { id: 1, name: 'John Doe' },
        })
      )
    }),
  ],
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
}

export default handlers

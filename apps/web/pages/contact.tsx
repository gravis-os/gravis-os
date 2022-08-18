import * as React from 'react'
import type { NextPage } from 'next'
import { Container, Typography, Box, Button } from '@gravis-os/ui'
import { Form, FormSections } from '@gravis-os/form'
import ProTip from '../src/ProTip'
import Copyright from '../src/Copyright'

const Contact: NextPage = () => (
  <Container maxWidth="lg">
    <Box
      sx={{
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Contact
      </Typography>

      <Form
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          window.alert(`${JSON.stringify(values, null, 2)}`)
        }}
        formJsx={
          <FormSections
            sections={[
              {
                key: 'general',
                title: 'General',
                subtitle: 'Fill up general info',
                fields: [
                  {
                    key: 'title',
                    name: 'title',
                    type: 'input',
                    required: true,
                  },
                  { key: 'content', name: 'content', type: 'html' },
                  { key: 'isActive', name: 'isActive', type: 'switch' },
                ],
              },
            ]}
          />
        }
      />

      <Box maxWidth="sm">
        <Button href="/">Go to the home page</Button>
      </Box>
      <ProTip />
      <Copyright />
    </Box>
  </Container>
)

export default Contact

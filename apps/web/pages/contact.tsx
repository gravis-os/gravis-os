import * as React from 'react'
import type { NextPage } from 'next'
import { Container, Typography, Box, Button } from '@gravis-os/ui'
import { Form, FormSections } from '@gravis-os/form'

const Person: NextPage = () => (
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
        Person
      </Typography>

      <Form
        onSubmit={(values) => {
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
                  { key: 'content', name: 'content', type: 'textarea' },
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
    </Box>
  </Container>
)

export default Person

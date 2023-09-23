import React from 'react'

import { Box, Stack, Typography } from '@gravis-os/ui'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'

export const MOCK_LOGO_JSX = (
  <Typography
    color="inherit"
    fontWeight="bold"
    sx={{ letterSpacing: 1, lineHeight: 1 }}
  >
    LOGO
  </Typography>
)

export const MOCK_LIST_ITEMS = [
  {
    title: '3 Quotations Pending',
    key: 'quotations',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    title: '3 Delivery Orders Pending',
    key: 'delivery-orders',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    title: '3 Sales Orders Pending',
    key: 'sales-orders',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    title: '3 Purchase Orders Pending',
    key: 'purchase-orders',
    startIcon: <ReceiptOutlinedIcon />,
  },
  { divider: true, key: 'divider' },
  {
    title: 'View All Orders',
    endIcon: <ChevronRightOutlinedIcon />,
    key: 'view-all-orders',
    startIcon: <ReceiptOutlinedIcon />,
  },
]

export const MOCK_TABS = [
  {
    children: (
      <Box p={3}>
        <Stack spacing={2}>
          {/* Header */}
          <Box>
            <Typography variant="h4">Finance Overview</Typography>
            <Typography color="text.secondary" variant="body1">
              View finance progress
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id
              interdum velit laoreet id donec ultrices. Odio morbi quis commodo
              odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
              est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
              lobortis feugiat vivamus at augue. At augue eget arcu dictum
              varius duis at consectetur lorem. Velit sed ullamcorper morbi
              tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt. Ornare
              suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
              Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
              ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
              aliquam sem et tortor. Habitant morbi tristique senectus et.
              Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
              aenean euismod elementum nisi quis eleifend. Commodo viverra
              maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
              aliquam ultrices sagittis orci a.
            </Typography>
          </Box>
        </Stack>
      </Box>
    ),
    key: 'finance',
    label: 'Finance',
    value: 'finance',
  },
  {
    children: (
      <Box p={3}>
        <Stack spacing={2}>
          {/* Header */}
          <Box>
            <Typography variant="h4">Sales Overview</Typography>
            <Typography color="text.secondary" variant="body1">
              View sales progress
            </Typography>
          </Box>
        </Stack>
      </Box>
    ),
    key: 'sales',
    label: 'Sales',
    value: 'sales',
  },
  {
    children: (
      <Box p={3}>
        <Stack spacing={2}>
          {/* Header */}
          <Box>
            <Typography variant="h4">Procurement Overview</Typography>
            <Typography color="text.secondary" variant="body1">
              View procurement progress
            </Typography>
          </Box>
        </Stack>
      </Box>
    ),
    key: 'procurement',
    label: 'Procurement',
    value: 'procurement',
  },
]

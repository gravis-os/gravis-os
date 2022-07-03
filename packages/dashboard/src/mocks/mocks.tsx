import React from 'react'
import { Box, Stack, Typography } from '@gravis-os/ui'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'

export const MOCK_LOGO_JSX = (
  <Typography
    fontWeight="bold"
    sx={{ lineHeight: 1, letterSpacing: 1 }}
    color="inherit"
  >
    LOGO
  </Typography>
)

export const MOCK_LIST_ITEMS = [
  {
    key: 'quotations',
    title: '3 Quotations Pending',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    key: 'delivery-orders',
    title: '3 Delivery Orders Pending',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    key: 'sales-orders',
    title: '3 Sales Orders Pending',
    startIcon: <ReceiptOutlinedIcon />,
  },
  {
    key: 'purchase-orders',
    title: '3 Purchase Orders Pending',
    startIcon: <ReceiptOutlinedIcon />,
  },
  { key: 'divider', divider: true },
  {
    key: 'view-all-orders',
    title: 'View All Orders',
    startIcon: <ReceiptOutlinedIcon />,
    endIcon: <ChevronRightOutlinedIcon />,
  },
]

export const MOCK_TABS = [
  {
    key: 'finance',
    value: 'finance',
    label: 'Finance',
    children: (
      <Box p={3}>
        <Stack spacing={2}>
          {/* Header */}
          <Box>
            <Typography variant="h4">Finance Overview</Typography>
            <Typography variant="body1" color="text.secondary">
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
  },
  {
    key: 'sales',
    value: 'sales',
    label: 'Sales',
    children: (
      <Box p={3}>
        <Stack spacing={2}>
          {/* Header */}
          <Box>
            <Typography variant="h4">Sales Overview</Typography>
            <Typography variant="body1" color="text.secondary">
              View sales progress
            </Typography>
          </Box>
        </Stack>
      </Box>
    ),
  },
  {
    key: 'procurement',
    value: 'procurement',
    label: 'Procurement',
    children: (
      <Box p={3}>
        <Stack spacing={2}>
          {/* Header */}
          <Box>
            <Typography variant="h4">Procurement Overview</Typography>
            <Typography variant="body1" color="text.secondary">
              View procurement progress
            </Typography>
          </Box>
        </Stack>
      </Box>
    ),
  },
]

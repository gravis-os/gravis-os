import React from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {
  Stack,
  Box,
  Breadcrumbs,
  Typography,
  Button,
  IconButton,
  Divider,
  ButtonProps,
  BoxProps,
  BreadcrumbsProps,
} from '@gravis-os/ui'

export interface PageHeaderProps
  extends Omit<BoxProps, 'title' | 'borderBottom'> {
  actions?: React.ReactNode
  actionButtons?: ButtonProps[]
  breadcrumbs?: BreadcrumbsProps['items']
  breadcrumbsProps?: Omit<BreadcrumbsProps, 'items'>
  borderBottom?: boolean
  buttonProps?: ButtonProps
  button?: React.ReactElement
  disableGutterBottom?: boolean
  disableBreadcrumbs?: boolean
  divider?: boolean
  size?: 'small' | 'medium' | 'large'
  title?: string | React.ReactElement
  onClose?: () => void
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const {
    actions,
    actionButtons,
    button,
    buttonProps,
    title,
    breadcrumbs,
    breadcrumbsProps,
    borderBottom,
    disableBreadcrumbs,
    disableGutterBottom,
    divider,
    onClose,
    size = 'medium',
    sx,
    ...rest
  } = props

  const isSmall = size === 'small'
  const spacing = isSmall ? 0.5 : 1

  return (
    <Box
      sx={{
        pb: !disableGutterBottom ? 2 : undefined,
        ...(borderBottom && {
          borderBottom: '1px solid',
          borderColor: 'divider',
        }),
        ...sx,
      }}
      {...rest}
    >
      {/* Breadcrumbs */}
      {!disableBreadcrumbs && (
        <Breadcrumbs items={breadcrumbs} {...breadcrumbsProps} />
      )}

      {/* Title + Actions */}
      <Stack
        direction="row"
        alignItems="flex-end"
        spacing={1}
        justifyContent="space-between"
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}
      >
        {/* Left */}
        <Stack direction="row" alignItems="center" spacing={spacing}>
          {onClose && (
            <IconButton size={size} onClick={onClose}>
              <CloseOutlinedIcon />
            </IconButton>
          )}
          <div>
            {title &&
              (typeof title === 'string' ? (
                <Typography variant={isSmall ? 'h4' : 'h2'}>{title}</Typography>
              ) : (
                title
              ))}
          </div>
        </Stack>

        {/* Right */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={spacing}
        >
          {actions}

          {actionButtons?.map((action) => (
            <Button size={size} key={action.key} {...action} />
          ))}

          {button ||
            (buttonProps && (
              <Button
                size={size}
                variant="contained"
                color="primary"
                {...buttonProps}
              />
            ))}
        </Stack>
      </Stack>

      {divider && <Divider />}
    </Box>
  )
}

export default PageHeader

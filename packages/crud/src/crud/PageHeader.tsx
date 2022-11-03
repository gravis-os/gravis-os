import React, { ReactNode } from 'react'
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
import useCrudFormContext from '../hooks/useCrudFormContext'
import { UseCrudFormReturn } from './useCrudForm'

export interface PageHeaderProps
  extends Omit<BoxProps, 'title' | 'borderBottom'> {
  actions?: React.ReactNode
  actionButtons?: ButtonProps[]
  breadcrumbs?: BreadcrumbsProps['items']
  breadcrumbsProps?: Omit<BreadcrumbsProps, 'items'>
  borderBottom?: boolean
  buttonProps?: ButtonProps
  button?: React.ReactElement
  renderButton?: (params: UseCrudFormReturn) => React.ReactNode
  disableGutterBottom?: boolean
  disableBreadcrumbs?: boolean
  divider?: boolean
  size?: 'small' | 'medium' | 'large'
  title?: ReactNode
  subtitle?: ReactNode
  onClose?: () => void
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const {
    actions,
    actionButtons,
    renderButton,
    button,
    buttonProps,
    title,
    subtitle,
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

  const crudFormContext = useCrudFormContext()

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
            {subtitle &&
              (typeof subtitle === 'string' ? (
                <Typography
                  variant={isSmall ? 'body2' : 'body1'}
                  sx={{ mt: 1 }}
                >
                  {subtitle}
                </Typography>
              ) : (
                subtitle
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

          {renderButton?.(crudFormContext) ??
            (button ||
              (buttonProps && (
                <Button
                  size={size}
                  variant="contained"
                  color="primary"
                  {...buttonProps}
                />
              )))}
        </Stack>
      </Stack>

      {divider && <Divider />}
    </Box>
  )
}

export default PageHeader

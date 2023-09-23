import React, { ReactNode } from 'react'

import {
  Box,
  BoxProps,
  Breadcrumbs,
  BreadcrumbsProps,
  Button,
  ButtonProps,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@gravis-os/ui'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import useCrudFormContext from '../hooks/useCrudFormContext'
import { UseCrudFormReturn } from './useCrudForm'

export interface PageHeaderProps
  extends Omit<BoxProps, 'borderBottom' | 'title'> {
  actionButtons?: ButtonProps[]
  actions?: React.ReactNode
  borderBottom?: boolean
  breadcrumbs?: BreadcrumbsProps['items']
  breadcrumbsProps?: Omit<BreadcrumbsProps, 'items'>
  button?: React.ReactElement
  buttonProps?: ButtonProps
  disableBreadcrumbs?: boolean
  disableGutterBottom?: boolean
  divider?: boolean
  onClose?: () => void
  renderButton?: (params: UseCrudFormReturn) => React.ReactNode
  rightTitle?: ReactNode
  size?: 'large' | 'medium' | 'small'
  subtitle?: ReactNode
  title?: ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const {
    title,
    actionButtons,
    actions,
    borderBottom,
    breadcrumbs,
    breadcrumbsProps,
    button,
    buttonProps,
    disableBreadcrumbs,
    disableGutterBottom,
    divider,
    onClose,
    renderButton,
    rightTitle,
    size = 'medium',
    subtitle,
    sx,
    ...rest
  } = props

  const crudFormContext = useCrudFormContext()

  const isSmall = size === 'small'
  const spacing = isSmall ? 0.5 : 1

  return (
    <Box
      sx={{
        pb: disableGutterBottom ? undefined : 2,
        ...(borderBottom && {
          borderBottom: '1px solid',
          borderColor: 'divider',
        }),
        ...sx,
      }}
      {...rest}
    >
      <Stack
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        {/* Breadcrumbs */}
        {!disableBreadcrumbs && (
          <Breadcrumbs items={breadcrumbs} {...breadcrumbsProps} />
        )}
        {rightTitle &&
          (typeof rightTitle === 'string' ? (
            <Typography variant="overline">{rightTitle}</Typography>
          ) : (
            rightTitle
          ))}
      </Stack>

      {/* Title + Actions */}
      <Stack
        alignItems="flex-end"
        direction="row"
        justifyContent="space-between"
        spacing={1}
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}
      >
        {/* Left */}
        <Stack alignItems="center" direction="row" spacing={spacing}>
          {onClose && (
            <IconButton onClick={onClose} size={size}>
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
                  sx={{ mt: 1 }}
                  variant={isSmall ? 'body2' : 'body1'}
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
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={spacing}
        >
          {actions}

          {actionButtons?.map((action) => (
            <Button key={action.key} size={size} {...action} />
          ))}

          {renderButton?.(crudFormContext) ??
            (button ||
              (buttonProps && (
                <Button
                  color="primary"
                  size={size}
                  variant="contained"
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

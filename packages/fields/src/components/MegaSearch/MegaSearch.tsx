import React from 'react'
import { Controller } from 'react-hook-form'

import { Button, ButtonProps, Divider, Stack, StackProps } from '@mui/material'

import MegaSearchAutocomplete, {
  MegaSearchAutocompleteProps,
} from './MegaSearchAutocomplete'
import MegaSearchTextField, {
  MegaSearchTextFieldProps,
} from './MegaSearchTextField'

export interface MegaSearchProps extends Omit<StackProps, 'onChange'> {
  buttonProps?: ButtonProps
  disableButton?: boolean
  dropdowns?: MegaSearchAutocompleteProps[]
  textFields?: MegaSearchTextFieldProps[]
}

const MegaSearch: React.FC<MegaSearchProps> = (props) => {
  const { buttonProps, disableButton, dropdowns, sx, textFields, ...rest } =
    props

  return (
    <Stack
      alignItems="center"
      direction={{ xs: 'column', md: 'row' }}
      divider={<Divider flexItem orientation="vertical" />}
      sx={{ background: 'white', borderRadius: 2, ...sx }}
      {...rest}
    >
      {dropdowns?.map((dropdown) => {
        const { control, onChange: injectedOnChange, ...rest } = dropdown
        const { name } = dropdown

        if (!control) {
          return (
            <MegaSearchAutocomplete
              key={name}
              onChange={injectedOnChange}
              {...rest}
            />
          )
        }

        return (
          <Controller
            control={control}
            key={name}
            name={name}
            render={(renderProps) => {
              const { field } = renderProps
              return (
                <MegaSearchAutocomplete
                  {...rest}
                  {...field}
                  onChange={(e, value, reason) => {
                    field.onChange(value)
                    if (injectedOnChange) injectedOnChange(e, value, reason)
                  }}
                />
              )
            }}
          />
        )
      })}

      {textFields?.map((textField) => {
        const { control, onChange: injectedOnChange, ...rest } = textField
        const { name } = textField
        if (!control) {
          return (
            <MegaSearchTextField
              key={name}
              onChange={injectedOnChange}
              {...rest}
            />
          )
        }

        return (
          <Controller
            control={control}
            key={name}
            name={name}
            render={(renderProps) => {
              const { field } = renderProps
              return (
                <MegaSearchTextField
                  {...rest}
                  {...field}
                  onChange={(e, value, reason) => {
                    field.onChange(value)
                    if (injectedOnChange) injectedOnChange(e, value, reason)
                  }}
                />
              )
            }}
          />
        )
      })}

      {/* Button */}
      {!disableButton && (
        <Button
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          {...buttonProps}
          sx={{
            height: '100%',
            maxWidth: (theme) => ({
              xs: `calc(100% - ${theme.spacing(4)})`,
              md: 200,
            }),
            minHeight: 60,
            mx: { xs: 4, md: 2 },
            my: { xs: 2, md: 0 },
            ...buttonProps?.sx,
          }}
        >
          {buttonProps?.children ?? 'Search'}
        </Button>
      )}
    </Stack>
  )
}

export default MegaSearch

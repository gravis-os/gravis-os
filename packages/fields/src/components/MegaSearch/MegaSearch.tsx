import { Button, ButtonProps, Divider, Stack, StackProps } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import MegaSearchAutocomplete, {
  MegaSearchAutocompleteProps,
} from './MegaSearchAutocomplete'

export interface MegaSearchProps extends Omit<StackProps, 'onChange'> {
  buttonProps?: ButtonProps
  dropdowns?: MegaSearchAutocompleteProps[]
  disableButton?: boolean
}

const MegaSearch: React.FC<MegaSearchProps> = (props) => {
  const { dropdowns, buttonProps, sx, disableButton, ...rest } = props

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{ background: 'white', borderRadius: 2, ...sx }}
      {...rest}
    >
      {dropdowns.map((dropdown) => {
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
            name={name}
            control={control}
            render={(renderProps) => {
              const { field } = renderProps
              return (
                <MegaSearchAutocomplete
                  key={name}
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
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          type="submit"
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

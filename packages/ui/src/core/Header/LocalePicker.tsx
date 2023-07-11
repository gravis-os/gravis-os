import React from 'react'
import { Stack, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import HeaderButtonWithMenu, {
  HeaderButtonWithMenuProps,
} from './HeaderButtonWithMenu'

// ISO 3166-1 alpha-2. ⚠️ No support for IE 11
const getFlagFromCountryISOAlpha2 = (isoCode: string): string => {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode
}

export interface Locale {
  key: string
  isoAlpha2: string
  title: string
}

export interface LocalePickerProps
  extends Omit<HeaderButtonWithMenuProps, 'key' | 'title'> {
  locales: Locale[]
}

const LocalePicker: React.FC<LocalePickerProps> = (props) => {
  const { locales, ...rest } = props

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  if (!locales?.length) return null

  // Router
  const router = useRouter()
  const { locale, asPath } = router

  // Items
  const items = locales.map((localeItem) => {
    const { key, isoAlpha2, title } = localeItem
    return {
      key,
      title: (
        <Stack key={key} direction="row" spacing={1.5}>
          <div>{getFlagFromCountryISOAlpha2(isoAlpha2)}</div>
          <div>{title}</div>
        </Stack>
      ),
      onClick: () => router.push(asPath, asPath, { locale: isoAlpha2 }),
    }
  })

  return (
    <HeaderButtonWithMenu
      key="locale-picker"
      title={getFlagFromCountryISOAlpha2(locale)}
      items={items}
      buttonProps={{
        sx: {
          fontSize: 20,
          borderRadius: 0,
          paddingX: matches ? 0 : null,
          minWidth: matches ? 48 : null,
        },
      }}
      {...rest}
    />
  )
}

export default LocalePicker

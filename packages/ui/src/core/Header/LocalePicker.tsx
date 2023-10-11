import React from 'react'

import { Stack, useMediaQuery, useTheme } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

import HeaderButtonWithMenu, {
  HeaderButtonWithMenuProps,
} from './HeaderButtonWithMenu'

// ISO 3166-1 alpha-2. ⚠️ No support for IE 11
const getFlagFromCountryISOAlpha2 = (isoCode: string): string => {
  return String.fromCodePoint === undefined
    ? isoCode
    : isoCode
        .toUpperCase()
        .replaceAll(/./g, (char) =>
          String.fromCodePoint(char.codePointAt(0) + 127_397)
        )
}

export interface Locale {
  isoAlpha2: string
  key: string
  title: string
}

export interface LocalePickerProps
  extends Omit<HeaderButtonWithMenuProps, 'key' | 'title'> {
  locales: Locale[]
}

const LocalePicker: React.FC<LocalePickerProps> = (props) => {
  const { locales, ...rest } = props

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const mobileStyles = isMobile ? { minWidth: 48, paddingX: 0 } : {}

  if (!locales?.length) return null

  // Router
  const router = useRouter()
  const pathname = usePathname()

  // @link: https://github.com/vercel/next.js/blob/canary/examples/app-dir-i18n-routing/app/%5Blang%5D/components/locale-switcher.tsx#L23
  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/'
    const segments = [...pathname.split('/'), locale]
    return segments.join('/')
  }

  // Items
  const items = locales.map((localeItem) => {
    const { title, isoAlpha2, key } = localeItem
    return {
      title: (
        <Stack direction="row" key={key} spacing={1.5}>
          <div>{getFlagFromCountryISOAlpha2(isoAlpha2)}</div>
          <div>{title}</div>
        </Stack>
      ),
      key,
      onClick: () => router.push(redirectedPathName(isoAlpha2)),
    }
  })

  return (
    <HeaderButtonWithMenu
      buttonProps={{
        sx: {
          borderRadius: 0,
          fontSize: 20,
          ...mobileStyles,
        },
      }}
      items={items}
      key="locale-picker"
      title={getFlagFromCountryISOAlpha2(pathname?.split('/')?.[1])}
      {...rest}
    />
  )
}

export default LocalePicker

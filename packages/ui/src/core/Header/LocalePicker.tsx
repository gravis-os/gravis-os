import React from 'react'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import HeaderButtonWithMenu from './HeaderButtonWithMenu'

// TODO@Joel: Abstract this
const localeConfig = {
  us: {
    title: 'United States of America',
    isoAlpha2: 'US',
  },
  sg: {
    title: 'Singapore',
    isoAlpha2: 'SG',
  },
  id: {
    title: 'Indonesia',
    isoAlpha2: 'ID',
  },
  th: {
    title: 'Thailand',
    isoAlpha2: 'TH',
  },
  vi: {
    title: 'Vietnam',
    isoAlpha2: 'VN',
  },
}

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

const LocalePicker: React.FC = () => {
  // Router
  const router = useRouter()
  const { locale, asPath } = router

  // Items
  const items = Object.entries(localeConfig).map(([locale, localeData]) => {
    return {
      title: (
        <Stack direction="row" spacing={1.5}>
          <div>{getFlagFromCountryISOAlpha2(localeData.isoAlpha2)}</div>
          <div>{localeData.title}</div>
        </Stack>
      ),
      onClick: () => router.push(asPath, asPath, { locale }),
    }
  })

  return (
    <HeaderButtonWithMenu
      key="locale-picker"
      title={getFlagFromCountryISOAlpha2(locale)}
      items={items}
      buttonProps={{ sx: { fontSize: 20, borderRadius: 0 } }}
    />
  )
}

export default LocalePicker

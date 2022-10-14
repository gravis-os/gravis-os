interface GetAsideWidthArgs {
  primaryAsideWidth?: number
  secondaryAsideWidth?: number
  miniVariantWidth?: number
  secondaryMiniVariantWidth?: number

  isPrimaryAsideOpen?: boolean
  isSecondaryAsideOpen?: boolean

  isMiniVariant?: boolean
  hasSecondaryLeftAside?: boolean
}

const getAsideWidth = ({
  primaryAsideWidth,
  secondaryAsideWidth,
  miniVariantWidth,
  secondaryMiniVariantWidth,

  isPrimaryAsideOpen,
  isSecondaryAsideOpen,

  isMiniVariant,
  hasSecondaryLeftAside,
}: GetAsideWidthArgs): number => {
  const nextMiniVariantWidth =
    isMiniVariant && !isPrimaryAsideOpen ? miniVariantWidth : 0
  const nextsecondaryMiniVariantWidth =
    hasSecondaryLeftAside && !isSecondaryAsideOpen
      ? secondaryMiniVariantWidth
      : 0

  const nextPrimaryAsideWidth = isPrimaryAsideOpen ? primaryAsideWidth : 0
  const nextSecondaryAsideWidth = isSecondaryAsideOpen ? secondaryAsideWidth : 0

  return (
    (nextMiniVariantWidth || 0) +
    (nextsecondaryMiniVariantWidth || 0) +
    (nextPrimaryAsideWidth || 0) +
    (nextSecondaryAsideWidth || 0)
  )
}

export default getAsideWidth

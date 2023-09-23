interface GetAsideWidthArgs {
  hasSecondaryLeftAside?: boolean
  isMiniVariant?: boolean
  isPrimaryAsideOpen?: boolean
  isSecondaryAsideOpen?: boolean

  miniVariantWidth?: number
  primaryAsideWidth?: number

  secondaryAsideWidth?: number
  secondaryMiniVariantWidth?: number
}

const getAsideWidth = ({
  hasSecondaryLeftAside,
  isMiniVariant,
  isPrimaryAsideOpen,
  isSecondaryAsideOpen,

  miniVariantWidth,
  primaryAsideWidth,

  secondaryAsideWidth,
  secondaryMiniVariantWidth,
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

const printSingularOrPluralText = (items, singularText, pluralText = '') => {
  if (items?.length > 1) return pluralText || `${singularText}s`

  return singularText
}

export default printSingularOrPluralText

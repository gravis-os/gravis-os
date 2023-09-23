const printSingularOrPluralText = (
  items: number | unknown[],
  singularText,
  pluralText = ''
) => {
  const isPlural = Array.isArray(items) ? items?.length > 1 : items > 1

  if (isPlural) return pluralText || `${singularText}s`

  return singularText
}

export default printSingularOrPluralText

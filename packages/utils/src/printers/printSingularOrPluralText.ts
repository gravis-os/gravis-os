const printSingularOrPluralText = (
  items: unknown[] | number,
  singularText,
  pluralText = ''
) => {
  const isPlural = Array.isArray(items) ? items?.length > 1 : items > 1

  if (isPlural) return pluralText || `${singularText}s`

  return singularText
}

export default printSingularOrPluralText

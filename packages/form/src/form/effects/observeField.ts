const observeField = ({ source, target }) => {
  return {
    watch: [source],
    setValue: (props) => {
      const { formState, values, getValues } = props
      const { isDirty } = formState

      const previousValues = getValues()
      const nextTargetValue = values?.[source]?.[target]

      if (!isDirty || !nextTargetValue) return previousValues?.[target]

      return nextTargetValue
    },
  }
}

export default observeField

const observeField = ({ source, target }) => {
  return {
    setValue: (props) => {
      const { formState, getValues, values } = props
      const { isDirty } = formState

      const previousValues = getValues()
      const nextTargetValue = values?.[source]?.[target]

      if (!isDirty || !nextTargetValue) return previousValues?.[target]

      return nextTargetValue
    },
    watch: [source],
  }
}

export default observeField

const withCreatedUpdatedBy = (options) => (values) => {
  const { isNew, user } = options

  if (!user) return values

  return {
    ...values,
    ...(isNew && { created_by: user.id }),
    updated_by: user.id,
  }
}

export default withCreatedUpdatedBy

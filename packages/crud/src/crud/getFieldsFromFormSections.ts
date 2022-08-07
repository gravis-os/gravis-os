const getFieldsFromFormSections = (formSections) =>
  (formSections?.map((section) => section.fields) ?? []).flat(2)

export default getFieldsFromFormSections

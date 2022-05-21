const saveOneToManyValues = async (props) => {
  const { item, values: oneToManyPairs, client, module } = props

  const primaryTableName = module.table.name

  const insertPromises = Object.entries(oneToManyPairs).map(([key, values]) => {
    if (!Array.isArray(values)) return

    const valuesWithId = values.map((value) => ({
      ...value,
      [`${primaryTableName}_id`]: item.id, // product_id = 1
    }))

    // Key is usually gallery_images. Construct foreign table name from relationalKey e.g. product_gallery_image
    const foreignTableName = `${primaryTableName}_${key.slice(0, -1)}`

    // Batch insert into a single table
    return client.from(foreignTableName).insert(valuesWithId)
  })

  return Promise.all(insertPromises)
}

export default saveOneToManyValues

const saveOneToManyValues = async (props) => {
  const { item, values: oneToManyPairs, client, module } = props

  // `product`
  const primaryTableName = module.table.name

  const insertPromises = Object.entries(oneToManyPairs).map(([key, values]) => {
    if (!Array.isArray(values)) return

    const valuesWithId = values.map((value) => ({
      ...value,
      [`${primaryTableName}_id`]: item.id, // product_id = 1
    }))

    // Key is usually gallery_images. Construct foreign table name from relationalKey e.g. product_gallery_image
    const foreignTableName = key

    // Batch upsert into a single table
    return client.from(foreignTableName).upsert(valuesWithId)
  })

  return Promise.all(insertPromises)
}

export default saveOneToManyValues

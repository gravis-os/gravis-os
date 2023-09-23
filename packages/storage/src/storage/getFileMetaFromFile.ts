const getFileMetaFromFile = (file, tableName: string) => {
  const fileExt = file.name.split('.').at(-1)
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${tableName}/${fileName}`
  const savedFileInfo = { file, fileExt, fileName, filePath }
  return savedFileInfo
}

export default getFileMetaFromFile

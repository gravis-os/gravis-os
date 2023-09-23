import { useEffect, useState } from 'react'

import { CrudModule } from '@gravis-os/types'
import downloadjs from 'downloadjs'

import getCsvUri from './getCsvUri'
import getTableColumnNames from './getTableColumnNames'
import useGetTableDefinitionByTableName from './useGetTableDefinitionByTableName'

const useDownloadTableDefinitionCsvFile = (props: {
  hasUploadTemplate?: boolean
  manyToManyKeys?: string[]
  module: CrudModule
  uploadFields?: string[]
}) => {
  const { hasUploadTemplate, manyToManyKeys, module, uploadFields } = props
  const { tableHeaderRenameMapping } = module ?? {}

  // Get table names for downloading the color
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [shouldDownload, setShouldDownload] = useState(false)

  // Fetch table definitions from database when handleDownload in the return is fired
  const tableDefinition = useGetTableDefinitionByTableName(module.table.name, {
    enabled: shouldDownload || hasUploadTemplate,
  })

  const tableColumnNames = getTableColumnNames(
    tableDefinition,
    tableHeaderRenameMapping,
    uploadFields,
    manyToManyKeys
  )

  // Effect: Download csv file with fetched column names
  useEffect(() => {
    if (shouldDownload && tableDefinition) {
      if (!tableColumnNames?.length) return
      const timestamp = new Date().toLocaleDateString().replaceAll('/', '_')
      downloadjs(
        getCsvUri(tableColumnNames),
        `${module.table.name}_upload_template_${timestamp}.csv`
      )
      setShouldDownload(false)
      setIsDownloaded(true)
    }
  }, [tableDefinition, shouldDownload, tableColumnNames, module.table.name])

  return {
    handleDownload: () => setShouldDownload(true),
    isDownloaded,
    resetIsDownloaded: () => setIsDownloaded(false),
    tableColumnNames,
    tableDefinition,
  }
}

export default useDownloadTableDefinitionCsvFile

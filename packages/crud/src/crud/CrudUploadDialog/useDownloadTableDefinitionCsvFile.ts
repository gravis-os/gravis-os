import { CrudModule } from '@gravis-os/types'
import { useEffect, useState } from 'react'
import downloadjs from 'downloadjs'
import useGetTableDefinitionByTableName from './useGetTableDefinitionByTableName'
import getCsvUri from './getCsvUri'
import getTableColumnNames from './getTableColumnNames'

const useDownloadTableDefinitionCsvFile = (props: { module: CrudModule }) => {
  const { module } = props

  // Get table names for downloading the color
  const [shouldDownload, setShouldDownload] = useState(false)

  // Fetch table definitions from database when handleDownload in the return is fired
  const tableDefinition = useGetTableDefinitionByTableName(module.table.name, {
    enabled: shouldDownload,
  })
  const tableColumnNames = getTableColumnNames(tableDefinition)

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
    }
  }, [tableDefinition, shouldDownload])

  return {
    handleDownload: () => setShouldDownload(true),
    tableDefinition,
    tableColumnNames,
    isDownloaded: Boolean(tableDefinition),
  }
}

export default useDownloadTableDefinitionCsvFile

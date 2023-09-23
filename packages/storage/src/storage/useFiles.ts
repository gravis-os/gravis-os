import React, { useEffect, useState } from 'react'

import { supabaseClient } from '@supabase/auth-helpers-nextjs'

import { File } from './types'
import { DEFAULT_BUCKET_NAME, cleanPath } from './utils'

const fetchStorageUrls = async ({
  bucketName = DEFAULT_BUCKET_NAME,
  srcs,
}: {
  bucketName?: string
  srcs: string[]
}) => {
  try {
    const downloadPromises = srcs.map(async (src) =>
      supabaseClient.storage
        .from(bucketName)
        .download(cleanPath(src, bucketName))
    )
    const downloadedItems = await Promise.all(downloadPromises)

    const storageUrls = downloadedItems.map((downloadedItem) => {
      const { data, error } = downloadedItem

      if (error) return null

      return URL.createObjectURL(data)
    })

    return storageUrls
  } catch (error) {
    console.error('Error downloading image:', error.message)
  }
}

export type UseFiles = ({
  bucketName,
  items,
}: {
  bucketName?: string
  items?: Array<{ src?: string } & File>
}) => {
  files: File[]
  setFiles?: React.Dispatch<React.SetStateAction<File[]>>
}

const useFiles: UseFiles = ({ bucketName, items }) => {
  const [files, setFiles] = useState<File[]>([])

  const shouldFetchStorageItems = Boolean(items?.length)

  // Hooks
  useEffect(() => {
    const fetchAndSetFiles = async ({ srcs }) => {
      const fetchedStorageUrls = await fetchStorageUrls({ bucketName, srcs })
      const fetchedFiles =
        items?.map?.((file, i) => ({
          ...file,
          url: fetchedStorageUrls[i],
        })) || []
      if (fetchedFiles.length > 0) {
        setFiles(fetchedFiles)
      }
    }

    if (shouldFetchStorageItems)
      fetchAndSetFiles({
        srcs: items?.map?.(({ src }) => src) || [],
      })
  }, [items])

  return { files, setFiles }
}

export default useFiles

import React, { useEffect, useState } from 'react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { size } from 'lodash'
import { File } from './types'
import { DEFAULT_BUCKET_NAME, cleanPath } from './utils'

const fetchStorageUrls = async ({
  srcs,
  bucketName = DEFAULT_BUCKET_NAME,
}: {
  srcs: string[]
  bucketName?: string
}) => {
  try {
    const downloadPromises = srcs.map(async (src) =>
      supabaseClient.storage
        .from(bucketName)
        .download(cleanPath(src, bucketName))
    )
    const downloadedItems = await Promise.all(downloadPromises)

    const storageUrls = downloadedItems.map((downloadedItem) => {
      const { data } = downloadedItem
      return URL.createObjectURL(data)
    })

    return storageUrls
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

export type UseFiles = ({
  items,
  bucketName,
}: {
  items?: Array<{ src?: string } & File>
  bucketName?: string
}) => {
  files: File[]
  setFiles?: React.Dispatch<React.SetStateAction<File[]>>
}

const useFiles: UseFiles = ({ items, bucketName }) => {
  const [files, setFiles] = useState<File[]>([])

  const shouldFetchStorageItems = Boolean(items?.length)

  // Hooks
  useEffect(() => {
    const fetchAndSetFiles = async ({ srcs }) => {
      const fetchedStorageUrls = await fetchStorageUrls({ srcs, bucketName })
      const fetchedFiles = items.map((file, i) => ({
        ...file,
        url: i < size(fetchedStorageUrls) ? fetchedStorageUrls[i] : '/',
      }))
      setFiles(fetchedFiles)
    }

    if (shouldFetchStorageItems)
      fetchAndSetFiles({
        srcs: items.map(({ src }) => src),
      })
  }, [items])

  return { files, setFiles }
}

export default useFiles

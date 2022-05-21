import React, { useEffect, useState } from 'react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { FileWithPath } from 'react-dropzone'

const fetchStorageUrls = async ({ srcs }: { srcs: string[] }) => {
  try {
    const downloadPromises = srcs.map(async (src) =>
      supabaseClient.storage.from('public').download(src)
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

export interface File extends FileWithPath {
  url?: string // blob to render into src constructed via URL.createObjectURL(file)
  alt?: string
}

export type UseFiles = ({
  items,
}: {
  items?: Array<{ src?: string } & File>
}) => {
  files: File[]
  setFiles?: React.Dispatch<React.SetStateAction<File[]>>
}

const useFiles: UseFiles = ({ items }) => {
  const [files, setFiles] = useState<File[]>([])

  const shouldFetchStorageItems = Boolean(items?.length)

  // Hooks
  useEffect(() => {
    const fetchAndSetFiles = async ({ srcs }) => {
      const fetchedStorageUrls = await fetchStorageUrls({ srcs })
      const fetchedFiles = items.map((file, i) => ({
        ...file,
        url: fetchedStorageUrls[i],
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

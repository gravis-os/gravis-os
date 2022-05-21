import { useEffect, useState } from 'react'
import {
  supabaseClient,
  SupabaseClient,
} from '@supabase/supabase-auth-helpers/nextjs'

type UseGetStorageObject = (props: {
  value?: string // Typically the form value
  filePath?: string
  bucketName?: string
  client?: SupabaseClient
}) => { src: string }

const useGetStorageObject: UseGetStorageObject = (props) => {
  const {
    filePath: injectedFilePath, // The S3 file path
    value,
    client = supabaseClient,
    bucketName = 'public',
  } = props

  // States
  const [savedFilePath, setSavedFilePath] = useState(injectedFilePath || value)
  const [objectUrl, setObjectUrl] = useState('')

  // Update state when defaultValue changes
  useEffect(() => {
    setSavedFilePath(injectedFilePath || value)
  }, [injectedFilePath, value])

  // Download image when src exists
  useEffect(() => {
    const fetchStorageObject = async (path) => {
      try {
        const { data, error } = await client.storage
          .from(bucketName)
          .download(path)
        if (error || !data) throw error
        const objectUrl = URL.createObjectURL(data)
        if (objectUrl) setObjectUrl(objectUrl)
      } catch (error) {
        console.error('Error downloading image: ', error.message)
      }
    }
    if (savedFilePath) fetchStorageObject(savedFilePath)
  }, [bucketName, client.storage, savedFilePath, value])

  return { src: objectUrl }
}

export default useGetStorageObject

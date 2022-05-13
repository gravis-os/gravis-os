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

const useGetStorageObject: UseGetStorageObject = props => {
  const {
    filePath: injectedFilePath,
    value,
    client = supabaseClient,
    bucketName = 'public',
  } = props

  // States
  const [savedFilePath, setSavedFilePath] = useState(injectedFilePath || value)
  const [avatarUrl, setAvatarUrl] = useState('')

  // Update state when defaultValue changes
  useEffect(() => {
    setSavedFilePath(injectedFilePath || value)
  }, [injectedFilePath, value])

  // Download image when src exists
  useEffect(() => {
    const downloadImage = async path => {
      try {
        const { data, error } = await client.storage
          .from(bucketName)
          .download(path)
        if (error || !data) throw error
        const url = URL.createObjectURL(data)
        if (url) setAvatarUrl(url)
      } catch (error) {
        console.error('Error downloading image: ', error.message)
      }
    }
    if (savedFilePath) downloadImage(savedFilePath)
  }, [bucketName, client.storage, savedFilePath, value])

  return {
    src: avatarUrl,
  }
}

export default useGetStorageObject

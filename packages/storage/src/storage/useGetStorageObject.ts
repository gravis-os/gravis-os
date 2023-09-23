import { useEffect, useState } from 'react'
import { QueryObserverOptions, useQuery } from 'react-query'

import { SupabaseClient, supabaseClient } from '@supabase/auth-helpers-nextjs'

type UseGetStorageObject = (props: {
  bucketName?: string
  client?: SupabaseClient
  filePath?: string
  queryOptions?: QueryObserverOptions<string>
  skip?: boolean
  value?: string // Typically the form value
}) => { src: string }

const useGetStorageObject: UseGetStorageObject = (props) => {
  const {
    bucketName = 'public',
    client = supabaseClient,
    filePath: injectedFilePath, // The S3 file path
    queryOptions,
    skip,
    value,
  } = props

  // States
  const [savedFilePath, setSavedFilePath] = useState(injectedFilePath || value)

  // Payload
  const [objectUrl, setObjectUrl] = useState('')

  // Update state when defaultValue changes
  useEffect(() => {
    setSavedFilePath(injectedFilePath || value)
  }, [injectedFilePath, value])

  const fetchStorageObject = async (path) => {
    if (!path) return ''

    // Escape the first `public/` in the path
    const pathWithoutPublicPrefix = path.split('public/')[1]

    const { error, publicURL: objectUrl } = client.storage
      .from(bucketName)
      .getPublicUrl(pathWithoutPublicPrefix)

    if (error || !objectUrl) throw error
    if (objectUrl) setObjectUrl(objectUrl)

    return objectUrl
  }

  // Download image when src exists
  const { data: cachedUrl } = useQuery<string>(
    ['use-get-storage-object', savedFilePath],
    () => fetchStorageObject(savedFilePath),
    {
      enabled: Boolean(!objectUrl && savedFilePath && !skip),
      ...queryOptions,
    }
  )

  return { src: objectUrl || cachedUrl }
}

export default useGetStorageObject

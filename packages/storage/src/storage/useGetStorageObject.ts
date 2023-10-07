import { useEffect, useState } from 'react'
import { QueryObserverOptions, useQuery } from 'react-query'

import {
  SupabaseClient,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

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
    client = supabase,
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

    const {
      data: { publicUrl: objectUrl },
    } = client.storage.from(bucketName).getPublicUrl(pathWithoutPublicPrefix)

    if (!objectUrl) throw new Error('Object URL not found')
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

import { useEffect, useState } from 'react'
import { supabaseClient, SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { QueryObserverOptions, useQuery } from 'react-query'

type UseGetStorageObject = (props: {
  value?: string // Typically the form value
  filePath?: string
  bucketName?: string
  client?: SupabaseClient
  skip?: boolean
  queryOptions?: QueryObserverOptions
}) => { src: string }

const useGetStorageObject: UseGetStorageObject = (props) => {
  const {
    filePath: injectedFilePath, // The S3 file path
    value,
    client = supabaseClient,
    bucketName = 'public',
    skip,
    queryOptions,
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
    const { data, error } = await client.storage.from(bucketName).download(path)
    if (error || !data) throw error
    const objectUrl = URL.createObjectURL(data)
    if (objectUrl) setObjectUrl(objectUrl)
    return data
  }

  // Download image when src exists
  const onUseQuery = useQuery(
    ['use-get-storage-object', savedFilePath],
    () => fetchStorageObject(savedFilePath),
    {
      enabled: Boolean(!objectUrl && savedFilePath && !skip),
      ...queryOptions,
    }
  )

  return { src: objectUrl }
}

export default useGetStorageObject

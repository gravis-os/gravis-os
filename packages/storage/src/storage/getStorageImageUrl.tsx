import { supabaseClient } from '@supabase/auth-helpers-nextjs'

const getStorageImageUrl = async (url: string): Promise<string> => {
  const bucketName = 'public'
  try {
    const { data, error } = await supabaseClient.storage
      .from(bucketName)
      .download(url)
    // If imageUrl cannot be fetched or if any error occured
    if (error || !data) throw error
    return URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloadingimage: ', error.message)
    return null
  }
}

export default getStorageImageUrl

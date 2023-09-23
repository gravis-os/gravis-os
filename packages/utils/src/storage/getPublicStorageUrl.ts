const getPublicStorageUrl = (imageUrl: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  switch (true) {
    case /^public.+/.test(imageUrl): {
      return `${supabaseUrl}/storage/v1/object/public/${imageUrl}`
    }
    default: {
      return imageUrl
    }
  }
}

export default getPublicStorageUrl

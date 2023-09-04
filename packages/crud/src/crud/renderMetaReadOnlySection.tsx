import React from 'react'
import { useQuery } from 'react-query'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { FormSectionReadOnlyStack } from '@gravis-os/form'
import { Grid } from '@gravis-os/ui'

const renderMetaReadOnlySection = ({ label, item }, userModuleTableName = "user") => {
  const { data: creator } = useQuery({
    queryFn: async () => {
      const { data } = await supabaseClient
        .from(userModuleTableName)
        .select('full_name')
        // @ts-ignore
        .match({ id: item?.created_by })
        .single()

      return data
    },
    queryKey: [userModuleTableName],
    enabled: Boolean(item?.created_by)
  })

  const { data: updater } = useQuery({
    queryFn: async () => {
      const { data } = await supabaseClient
        .from(userModuleTableName)
        .select('full_name')
        .match({ id: item?.updated_by })
        .single()

      return data
    },
    queryKey: [userModuleTableName],
    enabled: Boolean(item?.updated_by)
  })

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormSectionReadOnlyStack
          label="id"
          title={item?.id}
        />
      </Grid>

        <Grid item xs={12} md={6}>
          <FormSectionReadOnlyStack
            label="created_at"
            title={item?.created_at}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormSectionReadOnlyStack
            label="created_by"
            title={creator?.full_name}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormSectionReadOnlyStack
            label="updated_at"
            title={item?.updated_at}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormSectionReadOnlyStack
            label="updated_by"
            title={updater?.full_name}
          />
        </Grid>
    </Grid>
  )
}

export default renderMetaReadOnlySection

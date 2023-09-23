import React from 'react'
import { useQuery } from 'react-query'

import { FormSectionReadOnlyStack } from '@gravis-os/form'
import { Grid } from '@gravis-os/ui'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

const renderMetaReadOnlySection = (
  { item, label },
  userModuleTableName = 'user'
) => {
  const { data: creator } = useQuery({
    enabled: Boolean(item?.created_by),
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
  })

  const { data: updater } = useQuery({
    enabled: Boolean(item?.updated_by),
    queryFn: async () => {
      const { data } = await supabaseClient
        .from(userModuleTableName)
        .select('full_name')
        .match({ id: item?.updated_by })
        .single()

      return data
    },
    queryKey: [userModuleTableName],
  })

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormSectionReadOnlyStack label="id" title={item?.id} />
      </Grid>

      <Grid item md={6} xs={12}>
        <FormSectionReadOnlyStack label="created_at" title={item?.created_at} />
      </Grid>
      <Grid item md={6} xs={12}>
        <FormSectionReadOnlyStack
          label="created_by"
          title={creator?.full_name}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <FormSectionReadOnlyStack label="updated_at" title={item?.updated_at} />
      </Grid>

      <Grid item md={6} xs={12}>
        <FormSectionReadOnlyStack
          label="updated_by"
          title={updater?.full_name}
        />
      </Grid>
    </Grid>
  )
}

export default renderMetaReadOnlySection

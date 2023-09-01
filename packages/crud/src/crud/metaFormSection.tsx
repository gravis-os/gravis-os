import React from 'react'
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined'
import { useQuery } from 'react-query'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { FormSectionReadOnlyStack } from '@gravis-os/form'
import { Grid } from '@gravis-os/ui'

export const metaFormSectionWithFullName = {
  key: 'meta',
  title: 'Meta',
  subtitle: 'Manage meta',
  icon: <InventoryOutlinedIcon />,
  fields: [
    {
      key: 'id',
      name: 'id',
      type: 'input',
      disabled: true,
    },
    [
      {
        key: 'created_at',
        name: 'created_at',
        type: 'input',
        disabled: true,
      },
      {
        key: 'created_by_full_name',
        name: 'created_by_full_name',
        label: 'created_by',
        type: 'input',
        disabled: true,
      },
    ],
    [
      {
        key: 'updated_at',
        name: 'updated_at',
        type: 'input',
        disabled: true,
      },
      {
        key: 'updated_by_full_name',
        name: 'updated_by_full_name',
        label: 'updated_by',
        type: 'input',
        disabled: true,
      },
    ],
  ],
  collapsible: true,
  defaultCollapsed: true,
}

export const renderReadOnlySection = ({ label, item }, userModuleTableName = "user") => {
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
    // @ts-ignore
    queryKey: [userModuleTableName],
    // @ts-ignore
    enabled: Boolean(item?.created_by)
  })

  const { data: updater } = useQuery({
    queryFn: async () => {
      const { data } = await supabaseClient
        .from(userModuleTableName)
        .select('full_name')
        // @ts-ignore
        .match({ id: item?.updated_by })
        .single()

      return data
    },
    // @ts-ignore
    queryKey: [userModuleTableName],
    // @ts-ignore
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

/**
 * metaFormSection
 * Form Section to be used in CrudForm for standard metadata
 */
const metaFormSection = {
  key: 'meta',
  title: 'Meta',
  subtitle: 'Manage meta',
  icon: <InventoryOutlinedIcon />,
  fields: [
    { key: 'id', name: 'id', type: 'input', disabled: true },
    [
      { key: 'created_at', name: 'created_at', type: 'input', disabled: true },
      { key: 'created_by', name: 'created_by', type: 'input', disabled: true },
    ],
    [
      { key: 'updated_at', name: 'updated_at', type: 'input', disabled: true },
      { key: 'updated_by', name: 'updated_by', type: 'input', disabled: true },
    ],
  ],
  collapsible: true,
  defaultCollapsed: true,
}

export default metaFormSection

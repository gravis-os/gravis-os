import React from 'react'
import { Link, Stack, StackProps, Typography } from '@gravis-os/ui'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { File } from '@gravis-os/storage/src/storage/types'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import download from 'downloadjs'
import { useFiles } from '@gravis-os/storage'
import { FormSectionFieldTypeEnum } from './renderField'

export interface FormSectionReadOnlyStackProps
  extends Omit<StackProps, 'title'> {
  title?: React.ReactNode
  label: React.ReactNode
  disableTitle?: boolean
  type?: FormSectionFieldTypeEnum
}

// TODO: export from storage package
const downloadFromBlobUrl = async (file: File) => {
  const { url, name, type } = file
  const blob = await fetch(url).then((r) => r.blob())
  download(blob, name, type)
}

const FormSectionReadOnlyStack: React.FC<FormSectionReadOnlyStackProps> = (
  props
) => {
  const { disableTitle, title, label, type, children, ...rest } = props
  const hasFiles =
    type === FormSectionFieldTypeEnum.FILES &&
    Array.isArray(title) &&
    title.length > 0
  const { files } = useFiles({ items: hasFiles ? (title as File[]) : [] })

  return (
    <Stack spacing={1}>
      <Stack spacing={0.5} {...rest}>
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>
        {!disableTitle &&
          // Handle when files are fed as the title
          (hasFiles ? (
            <List>
              {files.map((file) => {
                const { path, name, alt }: File = file
                const handleDownloadClick = async () =>
                  downloadFromBlobUrl(file)
                return (
                  <ListItem
                    key={path}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      '& + &': {
                        mt: 1,
                      },
                    }}
                  >
                    <ListItemIcon>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link pointer onClick={handleDownloadClick}>
                          {name || alt}
                        </Link>
                      }
                      primaryTypographyProps={{
                        color: 'textPrimary',
                        variant: 'subtitle2',
                      }}
                    />
                  </ListItem>
                )
              })}
            </List>
          ) : (
            <Typography variant="subtitle1">{title || '-'}</Typography>
          ))}
      </Stack>

      {children}
    </Stack>
  )
}

export default FormSectionReadOnlyStack

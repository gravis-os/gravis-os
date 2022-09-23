import React from 'react'
import { Link, Stack, StackProps, Typography } from '@gravis-os/ui'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { File } from '@gravis-os/storage/src/storage/types'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import download from 'downloadjs'
import { useFiles } from '@gravis-os/storage'

export interface FormSectionReadOnlyStackProps
  extends Omit<StackProps, 'title'> {
  title?: React.ReactNode
  label: React.ReactNode
  disableTitle?: boolean
  // TODO: Refactor isFiles variant out to another component
  isFiles?: boolean
}

// TODO: export from storage package
const downloadFromBlobUrl = async (file: File) => {
  const { url, name, type } = file
  // @ts-ignore
  const blob = await fetch(url).then((r) => r.blob())
  return download(blob, name, type)
}

const getDisplayTitle = (title) => {
  switch (true) {
    case typeof title === 'boolean':
      return title ? 'Yes' : 'No'
    case typeof title === 'string' || React.isValidElement(title):
      return title
    default:
      return '-'
  }
}

const FormSectionReadOnlyStack: React.FC<FormSectionReadOnlyStackProps> = (
  props
) => {
  const { disableTitle, title, label, isFiles, children, ...rest } = props
  const hasFiles = isFiles && Array.isArray(title) && title.length > 0
  const { files } = useFiles({ items: hasFiles ? (title as File[]) : [] })

  const displayTitle = getDisplayTitle(title)

  return (
    <Stack spacing={1}>
      <Stack spacing={0.5} {...rest}>
        {/* Overline */}
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>

        {/* Title */}
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
            <Typography variant="subtitle1">{displayTitle}</Typography>
          ))}
      </Stack>

      {children}
    </Stack>
  )
}

export default FormSectionReadOnlyStack

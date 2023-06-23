import React from 'react'
import { Link, Stack, StackProps, Typography } from '@gravis-os/ui'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import download from 'downloadjs'
import type { File } from '@gravis-os/storage/src/storage/types'
import { useFiles } from '@gravis-os/storage'

export interface FormSectionFileProps {
  isFiles?: boolean
  /**
   * @default 'public'
   */
  bucketName?: string
}

export interface FormSectionReadOnlyStackProps
  extends Omit<StackProps, 'title'> {
  title?: React.ReactNode
  label: React.ReactNode
  disableTitle?: boolean
  fileProps?: FormSectionFileProps
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
    case typeof title === 'number' && !Number.isNaN(title):
      return title
    default:
      return '-'
  }
}

const getDisplayTitles = (titles) =>
  Array.isArray(titles)
    ? titles.map((title) => getDisplayTitle(title))
    : [getDisplayTitle(titles)]

const FormSectionReadOnlyStack: React.FC<FormSectionReadOnlyStackProps> = (
  props
) => {
  const {
    disableTitle,
    title,
    label,
    children,
    fileProps = {},
    ...rest
  } = props

  const { isFiles, bucketName } = fileProps
  const hasFiles = isFiles && Array.isArray(title) && title.length > 0
  const { files } = useFiles({
    items: hasFiles ? (title as File[]) : [],
    bucketName,
  })

  const displayTitles = getDisplayTitles(title)

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
            displayTitles.map((title, index) => (
              <Typography key={`${title}-${index}`} variant="subtitle1">
                {title}
              </Typography>
            ))
          ))}
      </Stack>

      {children}
    </Stack>
  )
}

export default FormSectionReadOnlyStack

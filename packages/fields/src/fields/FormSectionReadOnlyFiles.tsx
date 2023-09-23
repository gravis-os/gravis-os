import React from 'react'

import { File, downloadFromBlobUrl, useFiles } from '@gravis-os/storage'
import { Link, Stack, StackProps, Typography } from '@gravis-os/ui'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

export interface FormSectionFileProps {
  /**
   * @default 'public'
   */
  bucketName?: string
}

export interface FormSectionReadOnlyFilesProps
  extends Omit<StackProps, 'title'> {
  fileProps?: FormSectionFileProps
  files: File[]
  label: React.ReactNode
}

const FormSectionReadOnlyFiles: React.FC<FormSectionReadOnlyFilesProps> = (
  props
) => {
  const {
    children,
    fileProps = {},
    files: injectedFiles,
    label,
    ...rest
  } = props

  const { bucketName } = fileProps
  const { files } = useFiles({
    bucketName,
    items: injectedFiles ?? [],
  })

  return (
    <Stack spacing={1}>
      <Stack spacing={0.5} {...rest}>
        {/* Overline */}
        <Typography color="text.secondary" variant="overline">
          {label}
        </Typography>

        {files.length > 0 ? (
          <List>
            {files.map((file) => {
              const { alt, name, path }: File = file
              const handleDownloadClick = async () => downloadFromBlobUrl(file)
              return (
                <ListItem
                  key={path}
                  sx={{
                    '& + &': {
                      mt: 1,
                    },
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <ListItemIcon>
                    <FileCopyOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Link onClick={handleDownloadClick} pointer>
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
          <Typography variant="subtitle1">-</Typography>
        )}
      </Stack>

      {children}
    </Stack>
  )
}

export default FormSectionReadOnlyFiles

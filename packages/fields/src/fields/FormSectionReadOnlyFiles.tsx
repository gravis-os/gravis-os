import React from 'react'
import { Link, Stack, StackProps, Typography } from '@gravis-os/ui'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import { useFiles, File, downloadFromBlobUrl } from '@gravis-os/storage'

export interface FormSectionFileProps {
  /**
   * @default 'public'
   */
  bucketName?: string
}

export interface FormSectionReadOnlyFilesProps
  extends Omit<StackProps, 'title'> {
  files: File[]
  label: React.ReactNode
  fileProps?: FormSectionFileProps
}

const FormSectionReadOnlyFiles: React.FC<FormSectionReadOnlyFilesProps> = (
  props
) => {
  const {
    files: injectedFiles,
    label,
    children,
    fileProps = {},
    ...rest
  } = props

  const { bucketName } = fileProps
  const { files } = useFiles({
    items: injectedFiles ?? [],
    bucketName
  })

  return (
    <Stack spacing={1}>
      <Stack spacing={0.5} {...rest}>
        {/* Overline */}
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>

        {files.length > 0 ? (
          <List>
            {files.map((file) => {
              const { path, name, alt }: File = file
              const handleDownloadClick = async () => downloadFromBlobUrl(file)
              return (
                <ListItem
                  key={path}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    '& + &': {
                      mt: 1
                    }
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
                      variant: 'subtitle2'
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

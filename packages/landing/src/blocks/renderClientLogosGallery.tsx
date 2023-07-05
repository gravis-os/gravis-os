import { ClientLogo } from '@gravis-os/types'
import renderClientLogoCardBlockItem from './renderClientLogoCardBlockItem'

interface renderClientLogosGalleryProps {
  clientLogos: ClientLogo[]
  clientBlockHeader: string
}

const commonBlockProps = { center: true, maxWidth: 'md' }

const renderClientLogosGallery = (props: renderClientLogosGalleryProps) => {
  const { clientLogos, clientBlockHeader } = props
  return {
    key: 'gallery',
    ...commonBlockProps,
    dark: true,
    items: [
      { type: 'h4', title: clientBlockHeader },
      {
        type: 'grid',
        sx: { mt: { xs: 5, md: 10 } },
        maxWidth: 'xl',
        gridProps: { spacing: 1 },
        gridItemProps: { xs: 6, md: 4 },
        gridItems: clientLogos.map((clientLogo) => {
          const { avatar_src, avatar_alt, avatar_width, avatar_height } =
            clientLogo
          return renderClientLogoCardBlockItem({
            title: avatar_src,
            titleProps: {
              alt: avatar_alt,
              width: avatar_width,
              height: avatar_height,
            },
          })
        }),
      },
    ],
  }
}
//

export default renderClientLogosGallery

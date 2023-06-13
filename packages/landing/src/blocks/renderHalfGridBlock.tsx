import { useLayout } from '../providers/LayoutProvider'
import { BlockProps } from '../web/Block/Block'
import renderGhostButtonBlockItem, {
  RenderGhostButtonBlockItemProps,
} from './renderGhostButtonBlockItem'

export interface RenderHalfGridBlockProps {
  hero_src?: string
  hero_alt?: string
  overline?: string
  title: string
  subtitle?: string
  fullHeight?: boolean
  reverse?: boolean
  buttonProps?: RenderGhostButtonBlockItemProps
  items?: BlockProps['items']
}

const renderHalfGridBlock = (props: RenderHalfGridBlockProps) => {
  const {
    hero_src,
    hero_alt,
    overline,
    title,
    subtitle,
    fullHeight,
    reverse,
    buttonProps,
    items = [],
  } = props
  const { routeConfig } = useLayout()

  return {
    key: title,
    py: 0,
    disableContainerOnMobile: true,
    items: [
      {
        type: 'grid',
        gridProps: { spacing: 0, rowReverse: reverse, overflowX: 'hidden' },
        gridItemProps: {
          xs: 12,
          md: 6,
          sx: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
          },
        },
        gridItems: [
          // Text
          {
            sx: {
              my: { xs: 5, md: 15, xl: 20 },
              ...(reverse && { pl: { md: 6, lg: 8, xl: 10 } }),
            },
            items: [
              { type: 'overline', title: overline },
              {
                type: 'h3',
                title,
                titleProps: { gutterBottom: true },
              },
              {
                type: 'subtitle1',
                title: subtitle,
                titleProps: {
                  color: 'text.secondary',
                  maxWidth: !reverse,
                },
              },
              buttonProps &&
                renderGhostButtonBlockItem({
                  overline: 'Our Mission',
                  title: 'Enabling Smarter Businesses',
                  href: routeConfig?.MISSION,
                  boxProps: { mt: 3 },
                  ...buttonProps,
                }),
              ...items,
            ],
          },
          // Image
          {
            sx: {
              ...(fullHeight && {
                // Breakout image out of container
                margin: {
                  md: '0 calc(50% - 50vw)',
                  xxl: '0 calc(50% - 50vw + 8px)',
                },
                width: '100%',
                height: '100%',
                position: { md: 'absolute' },
                [reverse ? 'left' : 'right']: 0,

                '& .MuiBox-root': { width: '100%', height: '100%' },
              }),
            },
            items: [
              {
                type: 'image',
                title: hero_src,
                titleProps: { alt: hero_alt, fill: true },
              },
            ],
          },
        ],
      },
    ],
  }
}

export default renderHalfGridBlock

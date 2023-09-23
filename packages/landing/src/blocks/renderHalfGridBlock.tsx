import { useLayout } from '../providers/LayoutProvider'
import { BlockProps } from '../web/Block/Block'
import renderGhostButtonBlockItem, {
  RenderGhostButtonBlockItemProps,
} from './renderGhostButtonBlockItem'

export interface RenderHalfGridBlockProps {
  buttonProps?: RenderGhostButtonBlockItemProps
  fullHeight?: boolean
  hero_alt?: string
  hero_src?: string
  items?: BlockProps['items']
  overline?: string
  reverse?: boolean
  subtitle?: string
  title: string
}

const renderHalfGridBlock = (props: RenderHalfGridBlockProps) => {
  const {
    title,
    buttonProps,
    fullHeight,
    hero_alt,
    hero_src,
    items = [],
    overline,
    reverse,
    subtitle,
  } = props
  const { routeConfig } = useLayout()

  return {
    id: title,
    disableContainerOnMobile: true,
    items: [
      {
        gridItemProps: {
          xs: 12,
          md: 6,
          sx: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
          },
        },
        gridItems: [
          // Text
          {
            items: [
              { title: overline, type: 'overline' },
              {
                title,
                titleProps: { gutterBottom: true },
                type: 'h3',
              },
              {
                title: subtitle,
                titleProps: {
                  color: 'text.secondary',
                  maxWidth: !reverse,
                },
                type: 'subtitle1',
              },
              buttonProps &&
                renderGhostButtonBlockItem({
                  title: 'Enabling Smarter Businesses',
                  boxProps: { mt: 3 },
                  href: routeConfig?.MISSION,
                  overline: 'Our Mission',
                  ...buttonProps,
                }),
              ...items,
            ],
            sx: {
              my: { xs: 5, md: 15, xl: 20 },
              ...(reverse && { pl: { md: 6, lg: 8, xl: 10 } }),
            },
          },
          // Image
          {
            items: [
              {
                title: hero_src,
                titleProps: { alt: hero_alt, fill: true },
                type: 'image',
              },
            ],
            sx: {
              ...(fullHeight && {
                '& .MuiBox-root': { height: '100%', width: '100%' },
                height: '100%',
                // Breakout image out of container
                margin: {
                  md: '0 calc(50% - 50vw)',
                  xxl: '0 calc(50% - 50vw + 8px)',
                },
                position: { md: 'absolute' },
                [reverse ? 'left' : 'right']: 0,

                width: '100%',
              }),
            },
          },
        ],
        gridProps: { overflowX: 'hidden', rowReverse: reverse, spacing: 0 },
        type: 'grid',
      },
    ],
    py: 0,
  }
}

export default renderHalfGridBlock

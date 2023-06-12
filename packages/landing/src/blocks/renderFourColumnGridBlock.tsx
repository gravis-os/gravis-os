import renderBaseColumnGridBlock, {
  RenderBaseColumnGridBlockProps,
} from './renderBaseColumnGridBlock'

export interface RenderFourColumnGridBlockProps
  extends Omit<RenderBaseColumnGridBlockProps, 'columns'> {}

const renderFourColumnGridBlock = (props: RenderFourColumnGridBlockProps) => {
  return renderBaseColumnGridBlock({ ...props, columns: 4 })
}

export default renderFourColumnGridBlock

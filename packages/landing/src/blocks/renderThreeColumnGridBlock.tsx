import renderBaseColumnGridBlock, {
  RenderBaseColumnGridBlockProps,
} from './renderBaseColumnGridBlock'

export interface RenderThreeColumnGridBlockProps
  extends Omit<RenderBaseColumnGridBlockProps, 'columns'> {}

const renderThreeColumnGridBlock = (props: RenderThreeColumnGridBlockProps) => {
  return renderBaseColumnGridBlock({ ...props, columns: 3 })
}

export default renderThreeColumnGridBlock

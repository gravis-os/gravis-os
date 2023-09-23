const defaultInitializer = (index: number) => index

const createRange = <T = number>(
  length: number,
  initializer: (index: number) => any = defaultInitializer
): T[] => Array.from({ length }).map((_, index) => initializer(index))

export default createRange

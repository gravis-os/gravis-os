const defaultInitializer = (index: number) => index

const createRange = <T = number>(
  length: number,
  initializer: (index: number) => any = defaultInitializer
): T[] => [...new Array(length)].map((_, index) => initializer(index));

export default createRange

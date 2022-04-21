// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {}

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunc = (data: unknown): data is Function => typeof data === 'function'

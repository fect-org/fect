export type BeforeReadFn = (
  file: File | File[]
) => File | File[] | boolean | undefined | Promise<File | File[] | undefined>

export type AfterReadFn = (file: File | File[]) => void

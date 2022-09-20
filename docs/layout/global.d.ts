declare module 'virtual:router' {
  const routes: Array<
    Array<{
      title: string
      index: number
      name: string
      group: string
      dirName: string
      module: () => Promise<any>
    }>
  >
  export default routes
}

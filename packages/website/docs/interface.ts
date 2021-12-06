interface RouteChildren {
  title: string
  route: string
}

export interface Route {
  name: string
  children: RouteChildren[]
}

export type Routes = Route[]

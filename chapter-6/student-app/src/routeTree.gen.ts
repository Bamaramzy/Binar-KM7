/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const RegisterLazyImport = createFileRoute('/register')()
const ProfileLazyImport = createFileRoute('/profile')()
const LoginLazyImport = createFileRoute('/login')()
const IndexLazyImport = createFileRoute('/')()
const CarsCreateLazyImport = createFileRoute('/cars/create')()
const CarsIdLazyImport = createFileRoute('/cars/$id')()
const CarsEditIdLazyImport = createFileRoute('/cars/edit/$id')()

// Create/Update Routes

const RegisterLazyRoute = RegisterLazyImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/register.lazy').then((d) => d.Route))

const ProfileLazyRoute = ProfileLazyImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const CarsCreateLazyRoute = CarsCreateLazyImport.update({
  id: '/cars/create',
  path: '/cars/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/cars/create.lazy').then((d) => d.Route))

const CarsIdLazyRoute = CarsIdLazyImport.update({
  id: '/cars/$id',
  path: '/cars/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/cars/$id.lazy').then((d) => d.Route))

const CarsEditIdLazyRoute = CarsEditIdLazyImport.update({
  id: '/cars/edit/$id',
  path: '/cars/edit/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/cars/edit/$id.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileLazyImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/cars/$id': {
      id: '/cars/$id'
      path: '/cars/$id'
      fullPath: '/cars/$id'
      preLoaderRoute: typeof CarsIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/cars/create': {
      id: '/cars/create'
      path: '/cars/create'
      fullPath: '/cars/create'
      preLoaderRoute: typeof CarsCreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/cars/edit/$id': {
      id: '/cars/edit/$id'
      path: '/cars/edit/$id'
      fullPath: '/cars/edit/$id'
      preLoaderRoute: typeof CarsEditIdLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/profile': typeof ProfileLazyRoute
  '/register': typeof RegisterLazyRoute
  '/cars/$id': typeof CarsIdLazyRoute
  '/cars/create': typeof CarsCreateLazyRoute
  '/cars/edit/$id': typeof CarsEditIdLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/profile': typeof ProfileLazyRoute
  '/register': typeof RegisterLazyRoute
  '/cars/$id': typeof CarsIdLazyRoute
  '/cars/create': typeof CarsCreateLazyRoute
  '/cars/edit/$id': typeof CarsEditIdLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/login': typeof LoginLazyRoute
  '/profile': typeof ProfileLazyRoute
  '/register': typeof RegisterLazyRoute
  '/cars/$id': typeof CarsIdLazyRoute
  '/cars/create': typeof CarsCreateLazyRoute
  '/cars/edit/$id': typeof CarsEditIdLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/profile'
    | '/register'
    | '/cars/$id'
    | '/cars/create'
    | '/cars/edit/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/profile'
    | '/register'
    | '/cars/$id'
    | '/cars/create'
    | '/cars/edit/$id'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/profile'
    | '/register'
    | '/cars/$id'
    | '/cars/create'
    | '/cars/edit/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  ProfileLazyRoute: typeof ProfileLazyRoute
  RegisterLazyRoute: typeof RegisterLazyRoute
  CarsIdLazyRoute: typeof CarsIdLazyRoute
  CarsCreateLazyRoute: typeof CarsCreateLazyRoute
  CarsEditIdLazyRoute: typeof CarsEditIdLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  ProfileLazyRoute: ProfileLazyRoute,
  RegisterLazyRoute: RegisterLazyRoute,
  CarsIdLazyRoute: CarsIdLazyRoute,
  CarsCreateLazyRoute: CarsCreateLazyRoute,
  CarsEditIdLazyRoute: CarsEditIdLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/login",
        "/profile",
        "/register",
        "/cars/$id",
        "/cars/create",
        "/cars/edit/$id"
      ]
    },
    "/": {
      "filePath": "index.lazy.jsx"
    },
    "/login": {
      "filePath": "login.lazy.jsx"
    },
    "/profile": {
      "filePath": "profile.lazy.jsx"
    },
    "/register": {
      "filePath": "register.lazy.jsx"
    },
    "/cars/$id": {
      "filePath": "cars/$id.lazy.jsx"
    },
    "/cars/create": {
      "filePath": "cars/create.lazy.jsx"
    },
    "/cars/edit/$id": {
      "filePath": "cars/edit/$id.lazy.jsx"
    }
  }
}
ROUTE_MANIFEST_END */

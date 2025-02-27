import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App, Search, MovieDetails, DefaultErrorPage, Casts } from './pages/Pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <DefaultErrorPage />
    },
    {
        path:'/movies/:movieId',
        element: <MovieDetails />,
        errorElement: <DefaultErrorPage />
    },
    {
        path: '/movies/:movieId/casts',
        element: <Casts />,
        errorElement: <DefaultErrorPage />
    },
    {
        path: '/query/:query',
        element: <Search />,
        errorElement: <DefaultErrorPage />
    },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

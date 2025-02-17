import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App, Search, MovieDetails, ErrorElement, Casts } from './pages/Pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorElement />
    },
    {
        path:'/movies/:movieId',
        element: <MovieDetails />,
        // errorElement: <ErrorElement />
    },
    {
        path: '/movies/:movieId/casts',
        element: <Casts />,
        errorElement: <ErrorElement />
    },
    {
        path: '/query/:query',
        element: <Search />,
        errorElement: <ErrorElement />
    },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

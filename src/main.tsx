import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App, Search, MovieDetails } from './components/Components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path:'/movies/:movieId',
        element: <MovieDetails />
    },
    {
        path: '/query/:query',
        element: <Search />
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import * as React from 'react'
import App from './App.tsx'
import Home from './pages/home.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <React.StrictMode>
        <App/>
      </React.StrictMode>,
    // errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)

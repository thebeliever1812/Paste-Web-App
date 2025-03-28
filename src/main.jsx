import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Paste from './components/Paste.jsx'
import Layout from "./Layout.jsx"
import ViewPaste from './components/ViewPaste.jsx'
import SharePaste from './components/SharePaste.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'pastes',
        element: <Paste />,
      },
      {
        path: 'pasteID/:pasteId',
        element: <ViewPaste />
      },
      {
        path: 'view',
        element: <SharePaste />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
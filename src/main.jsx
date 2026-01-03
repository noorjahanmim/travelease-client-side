import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import AuthProvider from './context/AuthProvider.jsx'
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { router } from './router/routes.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider> 
  </StrictMode>,
)
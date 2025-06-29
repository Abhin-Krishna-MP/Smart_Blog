import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { BlogProvider } from './context/BlogContext.jsx'
import {ToastContainer} from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ToastContainer/>
      <AppProvider>
        <BlogProvider>
          <App />
        </BlogProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)

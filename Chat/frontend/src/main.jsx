import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.jsx'
import AuthPrvoider from './features/auth/auth.context.jsx'

createRoot(document.getElementById('root')).render(
  <AuthPrvoider>
    <App />
  </AuthPrvoider>,
)

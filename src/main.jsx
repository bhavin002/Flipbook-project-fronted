import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { preloadAllFonts } from '@/utils/dynamicFontManager'

// Preload all fonts when the app starts
preloadAllFonts().then(results => {
    console.log('🚀 All fonts preloaded successfully!', results);
}).catch(error => {
    console.error('❌ Font preload failed:', error);
});

createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <BrowserRouter>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
              <App />
              <Toaster position="top-center" />
          </GoogleOAuthProvider>
      </BrowserRouter>
  // </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './index.css'
import App from './App.jsx'
import {AuthProvider} from "./components/providers/auth-provider.jsx";
import LanguageProvider from "./components/providers/language-provider.jsx";
import ViewportProvider from "./components/providers/viewport-provider.jsx";
import {CookiesProvider} from "react-cookie";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ViewportProvider>
          <AuthProvider>
          <LanguageProvider>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
          </LanguageProvider>
          </AuthProvider>
        </ViewportProvider>
      </LocalizationProvider>
    </CookiesProvider>
  </StrictMode>,
)

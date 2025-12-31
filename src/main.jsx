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
import CustomThemeProvider from "./components/providers/theme-provider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ViewportProvider>
          <AuthProvider>
            <LanguageProvider>
              <CustomThemeProvider>
                <QueryClientProvider client={queryClient}>
                  <App />
                </QueryClientProvider>
              </CustomThemeProvider>
            </LanguageProvider>
          </AuthProvider>
        </ViewportProvider>
      </LocalizationProvider>
    </CookiesProvider>
  </StrictMode>,
)

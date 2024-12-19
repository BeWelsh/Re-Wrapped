import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Login/App.jsx'
import GetAccessToken from "./Login/GetAccessToken.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
     <GetAccessToken />
  </StrictMode>,
)

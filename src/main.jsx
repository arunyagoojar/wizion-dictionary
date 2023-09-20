import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react' // Import the NextUIProvider
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider> {/* Wrap NextUIProvider around App */}
      <App />
    </NextUIProvider>
  </React.StrictMode>,
)

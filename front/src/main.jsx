import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { myStore } from "./app/store.js"
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={myStore}>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </Provider>
  </React.StrictMode>,
)

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { GlobalProvider } from './context/GlobalContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </AuthProvider>


)

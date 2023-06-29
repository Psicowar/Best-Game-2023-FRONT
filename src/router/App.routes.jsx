import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ACCSETTINGS, HOME, SIGNIN, SIGNUP } from './path'
import { AccSettingsPage, SigninPage, SignupPage } from '../pages/index'
import { NavbarComponent } from '../components/index'


export const AppRoutes = () => {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path={HOME} element={<h1>Home</h1>} />
        <Route path={SIGNIN} element={<SigninPage />} />
        <Route path={SIGNUP} element={<SignupPage />} />
        <Route path={ACCSETTINGS} element={<AccSettingsPage />} />
      </Routes>
    </Router>
  )
}



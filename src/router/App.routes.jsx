import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { SIGNIN, HOME, SIGNUP } from './path'
import { SigninPage, SignupPage } from '../pages/index'
import { NavbarComponent } from '../components/index'
import { HomePage } from '../pages/HomePage'


export const AppRoutes = () => {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route index path={HOME} element={<HomePage />} />
        <Route path={SIGNIN} element={<SigninPage />} />
        <Route path={SIGNUP} element={<SignupPage />} />
      </Routes>
    </Router>
  )
}



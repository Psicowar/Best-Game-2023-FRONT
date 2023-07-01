import { Button, Navbar } from 'flowbite-react';
import { NavLink, useLocation } from "react-router-dom"
import { HOME, SIGNIN, SIGNUP } from '../../router/path';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

export const NavbarComponent = () => {

    const { authState, logout } = useAuth()
    const { isAuthenticated, user } = authState
    const location = useLocation()
    const { pathname } = location


    const handleLogout = () => {
        logout(null)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Logged out successfully',
            showConfirmButton: false,
            background: '#64748b',
            timer: 1500
        })
    }

    return (
        <Navbar
            fluid
            className='sticky top-0 bg-slate-500'
        >
            <Navbar.Brand>
                <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
                    Best Game 2023
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {
                    isAuthenticated ?
                        <div className='flex items-center gap-5'>
                            <span>Welcome {user.firstName}!</span>
                            <Button onClick={handleLogout}>
                                <span>Logout</span>
                            </Button>
                        </div>
                        :
                        pathname === SIGNIN ?

                            <NavLink to={SIGNUP}>
                                <Button>
                                    <span>Sign up</span>
                                </Button>
                            </NavLink>
                            :
                            <NavLink to={SIGNIN}>
                                <Button>
                                    <span>Sign in</span>
                                </Button>
                            </NavLink>
                }
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                {
                    pathname != HOME ?
                    <NavLink to={HOME} className='pr-16'>
                        <span className='bg-[#0e7490] hover:bg-[#0a5e75] text-white hover: p-3 rounded-lg'>Home</span>
                    </NavLink>
                    : null
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

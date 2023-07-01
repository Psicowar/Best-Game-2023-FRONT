import { Button, Navbar } from 'flowbite-react';
import { NavLink, useLocation } from "react-router-dom"
import { SIGNIN, SIGNUP } from '../../router/path';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

export const NavbarComponent = () => {
    
    const { authState, logout } = useAuth()
    const { isAuthenticated, user } = authState


    const handleLogout = () => {
        logout(null)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Logged out successfully',
            showConfirmButton: false,
            background: "#1b1e2a",
            timer: 1500
        })
    }

    const location = useLocation()
    const { pathname } = location
    return (
        <Navbar
            fluid
            rounded
            border
        >
            <Navbar.Brand>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
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

            </Navbar.Collapse>
        </Navbar>
    )
}

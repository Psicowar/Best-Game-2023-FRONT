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
            <div className="flex md:order-2 justify-between w-full">
                <Navbar.Brand>
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
                        Best Game 2023
                    </span>
                </Navbar.Brand>
                <Navbar.Collapse>
                    {
                        pathname != HOME ?
                            <NavLink to={HOME} className='pr-10 flex items-center'>
                                <Button>Home</Button>
                            </NavLink>
                            : null
                    }
                </Navbar.Collapse>
                {
                    isAuthenticated ?
                        <>
                            <div className='flex items-center gap-5'>
                                <div>
                                    <p>Welcome {user.firstName} you have <span className='rounded-md bg-red-500 px-2 m-2 font-semibold text-2xl'>{user.remainingVotes}</span> votes left!</p>
                                </div>
                                <Button onClick={handleLogout}>
                                    <span>Logout</span>
                                </Button>
                            </div>
                        </>
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
        </Navbar>
    )
}

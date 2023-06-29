import { Button, Navbar } from 'flowbite-react';
import { NavLink, useLocation } from "react-router-dom"
import { ACCSETTINGS, HOME, SIGNIN, SIGNUP } from '../../router/path';

export const NavbarComponent = () => {
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
                <Button>
                    {
                        pathname === SIGNIN ?
                            <NavLink to={SIGNUP}>
                                <span className="">Sign up</span>
                            </NavLink>
                            :
                            <NavLink to={SIGNIN}>
                                <span className="">Sign in</span>
                            </NavLink>
                    }
                </Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <NavLink to={HOME} className={({ isActive }) => (isActive ? 'bg-gray-200 flex justify-center text-teal-600' : 'hover:bg-gray-100 flex justify-center hover:text-teal-600')}>
                    <span>Home</span>
                </NavLink>
                <NavLink to={ACCSETTINGS} className={({ isActive }) => (isActive ? 'bg-gray-200 flex justify-center text-teal-600' : 'hover:bg-gray-100 flex justify-center hover:text-teal-600')}>
                    <span>Account settings</span>
                </NavLink>
            </Navbar.Collapse>
        </Navbar>
    )
}

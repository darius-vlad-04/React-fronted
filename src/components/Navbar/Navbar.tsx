import * as React from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { stringAvatar } from "../../utils/generateLetterAvatar.ts";
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for the menu

// Material-UI imports
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';

// CSS and asset imports
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { logout } from "../../services/authService.ts";

export default function Navbar() {

    const { user, isLoading, mutateUser } = useCurrentUser();
    const [open, setOpen] = React.useState(false); // State for the user dropdown menu
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false); // State for the mobile menu


    React.useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('body-no-scroll');
        } else {
            document.body.classList.remove('body-no-scroll');
        }
        return () => {
            document.body.classList.remove('body-no-scroll');
        };
    }, [isMobileMenuOpen]);


    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current && !open) {
            anchorRef.current!.focus();
        }
        prevOpen.current = open;
    }, [open]);


    const handleToggle = () => setOpen((prevOpen) => !prevOpen);

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab' || event.key === 'Escape') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleLogout = async (event: Event | React.SyntheticEvent) => {
        handleClose(event);
        try {
            await logout();
            await mutateUser(undefined);
            window.location.href = '/login';
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    const handleNavigate = (event: Event | React.SyntheticEvent, path: string) => {
        handleClose(event);
        setIsMobileMenuOpen(false);
        window.location.href = path;
    };


    return (
        <header className="nav-bar">

            <a href="/home" className="nav-left">
                <img src={logo} alt="Boostr Logo" className="logo" />
                <h1 className="product-name">Boostr</h1>
            </a>


            <div className={`links ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>

                <button className="mobile-close-button" onClick={() => setIsMobileMenuOpen(false)}>
                    <FaTimes />
                </button>


                <a href="/explore">Explore Startups</a>
                <a href="/leaderboard">Leaderboard</a>


                {!isLoading && (
                    user ? (

                        <Stack direction="row" spacing={2}>
                            <IconButton
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                                sx={{ p: 0 }}
                            >
                                <Avatar {...stringAvatar(user.name)} sx={{ width: 40, height: 40 }}/>
                            </IconButton>
                            <Popper
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                placement="bottom-end"
                                transition
                                disablePortal
                                className="popper-menu"
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList
                                                    autoFocusItem={open}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown}
                                                >
                                                    <MenuItem onClick={(e) => handleNavigate(e, `/my-profile`)}>Profile</MenuItem>
                                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Stack>
                    ) : (

                        <div className="auth-links">
                            <a href="/login" className="nav-link-secondary">Login</a>
                            <a href="/register" className="nav-link-primary">Create an account</a>
                        </div>
                    )
                )}
            </div>


            <button className="hamburger-button" onClick={() => setIsMobileMenuOpen(true)}>
                <FaBars />
            </button>
        </header>
    );
}
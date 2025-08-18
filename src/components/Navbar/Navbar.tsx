import * as React from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { stringAvatar } from "../../utils/generateLetterAvatar.ts";

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { logout } from "../../services/authService.ts";

export default function Navbar() {
    const { user, isLoading } = useCurrentUser();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

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
            // Using SWR's mutate function is generally better than a hard reload
            // await mutate(undefined);
            window.location.href = '/login'; // Redirect after logout
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    const handleNavigate = (event: Event | React.SyntheticEvent, path: string) => {
        handleClose(event);
        window.location.href = path; // Consider using react-router's useNavigate for SPA navigation
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current && !open) {
            anchorRef.current!.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <header className="nav-bar">
            {/* The logo and name are now a single link to the homepage */}
            <a href="/" className="nav-left">
                <img src={logo} alt="Boostr Logo" className="logo" />
                <h1 className="product-name">Boostr</h1>
            </a>

            <div className="links">
                <a href="/explore">Explore Startups</a>
                <a href="/leaderboard">Leaderboard</a>

                {/*
              The unnecessary fragment has been removed from here.
              The logic block now correctly returns a single element in all cases.
            */}
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
                                        style={{
                                            transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList
                                                    autoFocusItem={open}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown}
                                                >
                                                    <MenuItem onClick={(e) => handleNavigate(e, `/user/${user.id}`)}>Profile</MenuItem>
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
        </header>
    );
}
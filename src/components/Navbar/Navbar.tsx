import * as React from 'react';
import {useCurrentUser} from '../../hooks/useCurrentUser';
import {stringAvatar} from "../../utils/generateLetterAvatar.ts";


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
import {logout} from "../../services/authService.ts";


export default function Navbar() {
    const {user, isLoading, mutateUser} = useCurrentUser();


    const [open, setOpen] = React.useState(false);

    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    };


    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
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
        window.location.href = path;
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
            <div className="nav-left">
                <h1 className="product-name">Boostr</h1>
                <div className="banner">
                    <img src={logo} alt="Here is the logo"/>
                </div>
            </div>
            <div className="links">
                <a href="/startups"> Check out startups</a>
                <a href="/donors"> Top Donors List</a>

                {!isLoading && (
                    <>
                        {user ? (
                            <Stack className="avatar-section" direction="row" spacing={2}>
                                <IconButton
                                    ref={anchorRef}
                                    id="composition-button"
                                    aria-controls={open ? 'composition-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                    sx={{p: 0}}
                                >
                                    <Avatar {...stringAvatar(user.name)} />
                                </IconButton>
                                <Popper
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
                                >
                                    {({TransitionProps, placement}) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
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
                                                        <MenuItem
                                                            onClick={(e) => handleNavigate(e, '/my-profile')}>Profile</MenuItem>
                                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </Stack>
                        ) : (
                            <>
                                <a href="/register">Create an account</a>
                                <a href="/login">Login</a>
                            </>
                        )}
                    </>
                )}
            </div>
        </header>
    );
}
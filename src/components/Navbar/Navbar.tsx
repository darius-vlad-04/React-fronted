import "./Navbar.css";
import logo from "../../assets/logo.png";
import {stringAvatar} from "../../utils/generateLetterAvatar.ts";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


import {useCurrentUser} from '../../hooks/useCurrentUser';

export default function Navbar() {
    const {user, isLoading} = useCurrentUser();

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
                            <Stack direction="row" spacing={2}>
                                <a href="/profile" style={{textDecoration: 'none'}}>
                                    <Avatar {...stringAvatar(user.name)} />
                                </a>
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
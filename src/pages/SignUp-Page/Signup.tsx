import "./Signup.css";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import * as React from "react";


import StyledTextField from "../../components/CustomTextFields/StyledTextField.tsx";
import PasswordField from "../../components/CustomTextFields/PasswordFields.tsx";
import type {UserCreationInterface} from "../../models/user-models/userCreationInterface.ts";
import {signup} from "../../services/authService.ts";
import Carousel from "../../components/AutomaticCarousel/Carousel.tsx";


export default function Signup() {
    const [username, setUsername] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            const userData: UserCreationInterface = {name: username, email: email, password: password};
            const response = await signup(userData);
            console.log('Signup successful:', response.data);
        } catch (e) {
            if (e instanceof Error)
                console.log(e.message)
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="signup-window">
            <div className="signup-container">
                <div className="left-signup-side">
                    <Carousel></Carousel>
                </div>

                <form className="right-signup-side" onSubmit={handleSubmit}>
                    <Box sx={{width: '100%'}}>
                        <h1>Create an account</h1>
                        <Typography variant="subtitle1" sx={{color: 'grey.500'}}>
                            Already have an account? <a href="/login"
                                                        style={{color: '#45a29e', textDecoration: 'none'}}>Login.</a>
                        </Typography>
                    </Box>

                    <StyledTextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <StyledTextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />


                    <PasswordField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>


                    <Button
                        type="submit"
                        variant="contained"


                        sx={{
                            backgroundColor: "#45a29e",
                            '&:hover': {
                                backgroundColor: '#428784',
                            },
                            padding: '10p 30px',
                            fontSize: "1rem",
                            fontWeight: "bold"
                        }}
                    >
                        {loading ? <CircularProgress size={24} sx={{color: 'white'}}/> : 'Signup'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
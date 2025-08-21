import "./Login.css";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import * as React from "react";


import StyledTextField from "../../components/CustomTextFields/StyledTextField.tsx";
import PasswordField from "../../components/CustomTextFields/PasswordFields.tsx";
import Carousel from "../../components/AutomaticCarousel/Carousel.tsx";
import {login} from "../../services/authService.ts";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";


export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const notify = (message: string) => toast.error(message);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            const credentials = {email: email, password: password}
            const response = await login(credentials);
            console.log('Login successful:', response.data);
            navigate('/home');
        } catch (e) {
            let errorMessage = e.response.data.error;
            if (e instanceof Error) {
                notify(errorMessage)
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="login-window">
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="login-container">
                <div className="left-login-side">
                    <Carousel></Carousel>
                </div>

                <form className="right-login-side" onSubmit={handleSubmit}>
                    <Box sx={{width: '100%'}}>
                        <h1>Login to your account</h1>
                        <Typography variant="subtitle1" sx={{color: 'grey.500'}}>
                            Already have an account? <a href="/signup"
                                                        style={{color: '#45a29e', textDecoration: 'none'}}>Signup</a>
                        </Typography>
                    </Box>


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
                        {loading ? <CircularProgress size={24} sx={{color: 'white'}}/> : 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
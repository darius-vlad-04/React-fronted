import "./Login.css"
import {Box, TextField} from "@mui/material";

export default function Login() {
    return (
        <div className="signup-container">
            <div className="left-signup-side">
                {/*<img  className="signup-illustration" src={animatedPicture} alt="ilustration"/>*/}
                Insert Image here
            </div>
            <div className="right-signup-side">
                <h1>Create an account</h1>
                <Box
                    borderRadius="12"
                    component="form"
                    bgcolor="#1f2833">
                    <TextField
                        fullWidth
                        sx={{input: {color: 'white'}}}
                    >
                    </TextField>
                </Box>

                <Box bgcolor="#1f2833"
                   borderRadius= '12px'>
                    <TextField
                        fullWidth
                        sx={{
                            input: {color: 'white'},

                        }}
                    >
                    </TextField>
                </Box>

                <Box bgcolor="#1f2833">
                    <TextField
                        fullWidth
                        sx={{input: {color: 'white'}}}
                    >
                    </TextField>
                </Box>
            </div>
        </div>
    );

}
import React from 'react';
import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    type OutlinedInputProps
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


type PasswordFieldProps = Omit<OutlinedInputProps, 'type'>

const PasswordField: React.FC<PasswordFieldProps> = ({value, onChange, ...props}) => {

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box bgcolor="#1f2833" borderRadius='12px' width="80%">
            <FormControl fullWidth variant="outlined">
                <InputLabel
                    htmlFor="outlined-adornment-password"
                    sx={{
                        color: 'white',
                        '&.Mui-focused': {
                            color: 'white'
                        }
                    }}
                >
                    Password
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={value}
                    onChange={onChange}
                    sx={{
                        color: 'white',

                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white'
                        },

                        '& .MuiInputBase-input:-webkit-autofill': {
                            '-webkit-box-shadow': '0 0 0 1000px #1f2833 inset',
                            '-webkit-text-fill-color': 'white',
                            borderRadius: 'inherit',
                        },
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? 'hide password' : 'show password'}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                sx={{color: "white"}}
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    {...props}
                />
            </FormControl>
        </Box>
    );
};

export default PasswordField;
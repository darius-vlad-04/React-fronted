import React from 'react';
import {Box, TextField, type TextFieldProps} from '@mui/material';

type StyledTextFieldProps = Omit<TextFieldProps, 'variant'>;

const StyledTextField: React.FC<StyledTextFieldProps> = (props) => {
    return (
        <Box
            width="80%"
            borderRadius="12px"
            bgcolor="#1f2833"


        >
            <TextField
                fullWidth
                variant="outlined"
                {...props}
                sx={{

                    '& .MuiInputLabel-root': {color: 'white'},
                    '& .MuiInputLabel-root.Mui-focused': {color: 'white'},


                    '& .MuiInputBase-input': {color: 'white'},


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
                    ...props.sx
                }}
            />
        </Box>
    );
};

export default StyledTextField;
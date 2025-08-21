import {LinearProgress} from "@mui/material";
import type {LinearProgressProps} from "@mui/material";

interface ProgressBarProps {
    percentage: number;
}


const themedProgressProps = (value: number): LinearProgressProps => ({
    variant: "determinate",
    value: value,
    sx: {

        height: 12,
        borderRadius: 5,


        backgroundColor: '#2e3a48',


        '& .MuiLinearProgress-bar': {
            borderRadius: 5,

            background: 'linear-gradient(to right, #45a29e, #66fcf1)',
        },
    },
});


function ProgressBar({percentage}: ProgressBarProps) {

    const clampedPercentage = Math.max(0, Math.min(100, percentage));

    return (
        <LinearProgress {...themedProgressProps(clampedPercentage)} />
    );
}

export default ProgressBar;
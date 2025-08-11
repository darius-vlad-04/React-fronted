import {LinearProgress} from "@mui/material";

interface ProgressBarProps {
    percentage: number
}

function ProgressBar({percentage}: ProgressBarProps) {
    return (
        <LinearProgress variant="determinate" value={percentage}></LinearProgress>
    )
}

export default ProgressBar
import type {StartupInterface} from "../../models/startupInterface.ts";
import "./StartupCard.css";
import ProgressBar from "../ProgressBar/ProgressBar.tsx";

interface StartupCardProps {
    startup: StartupInterface | undefined;
}

function StartupCard({startup}: StartupCardProps) {
    const percentage: number = startup!.current_funding * 100 / startup!.funding_goal;
    return (
        <div className="startup-card-wrapper">
            <h1 className="startup-title">{startup?.name}</h1>


            <div className="startup-description-container">
                <p className="startup-description">
                    {startup?.description}
                </p>
            </div>

            <div className="funding-goal">
                <p className="funding-goal-description">
                    Current funding: {startup?.current_funding}$ / {startup?.funding_goal}$
                </p>
                <ProgressBar percentage={percentage}/>
            </div>
        </div>
    );
}

export default StartupCard;
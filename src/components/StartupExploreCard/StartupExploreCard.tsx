import styles from './StartupExploreCard.module.css';
import ProgressBar from "../ProgressBar/ProgressBar.tsx";
import type {StartupInterface} from "../../models/startup-models/startupInterface.ts";
import {useNavigate} from "react-router-dom";
import userAvatarPlaceholder from '../../assets/user-avatar.jpg';
import {useUserById} from "../../hooks/useUserById.ts";

interface StartupCardProps {
    startup: StartupInterface | undefined;
}

export default function StartupExploreCard({startup}: StartupCardProps) {
    const navigate = useNavigate();
    const founderId = startup?.founder_id || null;
    const {user: founder, isLoading: isFounderLoading, isError: isFounderError} = useUserById(founderId)


    const BASE_BACKEND_URL = import.meta.env.VITE_API_URL;
    const imageUrl = `${BASE_BACKEND_URL}/uploads/${founder?.profile_pic_path}`;

    if (!startup) {
        return <div>Loading...</div>;
    }

    const handleStartupNavigate = () => {
        navigate(`/startup/${startup.id}`);
    };


    const handleFounderNavigate = (event: React.MouseEvent) => {
        event.stopPropagation();
        navigate(`/user/${startup.founder_id}`);
        console.log(`Navigating to user ${startup.founder_id}`);
    };

    const percentage: number = startup.funding_goal > 0 ? (startup.current_funding * 100) / startup.funding_goal : 0;

    return (
        <div className={styles['startup-card-wrapper']}>
            <div>
                <h1 className={styles['startup-title']}>{startup.name}</h1>
                <div className={styles['startup-description-container']}>
                    <p className={styles['startup-description']}>
                        {startup.description}
                    </p>
                </div>
            </div>

            <div className={styles['bottom-section']}>
                <div className={styles['funding-goal']}>
                    <p className={styles['funding-goal-description']}>
                        ${startup.current_funding.toLocaleString()} / ${startup.funding_goal.toLocaleString()}
                    </p>
                    <ProgressBar percentage={percentage}/>
                </div>


                <button onClick={handleStartupNavigate} className={styles['view-details-button']}>
                    View Details
                </button>

                <div className={styles['founder-info']}>
                    <div onClick={handleFounderNavigate} className={styles['founder-avatar-wrapper']}>
                        <img
                            src={founder?.profile_pic_path === null ? userAvatarPlaceholder : imageUrl}
                            alt={`${founder?.name}'s profile`}
                            className={styles['founder-avatar']}
                        />
                    </div>
                    <div className={styles['founder-details']}>
                        <span className={styles['founder-name']}>
                            {founder?.name}
                        </span>
                        <span className={styles['founder-title']}>Creator</span>
                    </div>
                </div>
            </div>
        </div>
    );

}
import {useNavigate} from 'react-router-dom';
import styles from './LeaderboardComponent.module.css';
import userAvatarPlaceholder from '../../assets/user-avatar.jpg';


export interface LeaderboardUser {
    id: number;
    name: string;
    profile_pic_path: string | null;
    metric: number | string;
}

interface LeaderboardProps {
    users: LeaderboardUser[] | undefined;
    isLoading: boolean;
    metricLabel: string;
}

export default function LeaderboardComponent({users, isLoading, metricLabel}: LeaderboardProps) {
    const navigate = useNavigate();
    const BASE_BACKEND_URL = import.meta.env.VITE_API_URL;


    const getRankClass = (index: number) => {
        if (index === 0) return styles.gold;
        if (index === 1) return styles.silver;
        if (index === 2) return styles.bronze;
        return '';
    };

    if (isLoading) {
        return <div className={styles.loadingContainer}>Loading Leaderboard...</div>;
    }

    if (!users || users.length === 0) {
        return <p className={styles.noResults}>No data available for this leaderboard.</p>;
    }

    return (
        <div className={styles.leaderboardContainer}>
            <div className={`${styles.leaderboardRow} ${styles.header}`}>
                <div className={styles.rank}>#</div>
                <div className={styles.user}>User</div>
                <div className={styles.metric}>{metricLabel}</div>
            </div>


            {users.map((user, index) => {
                const imageUrl = user.profile_pic_path
                    ? `${BASE_BACKEND_URL}/uploads/${user.profile_pic_path}`
                    : userAvatarPlaceholder;

                return (
                    <div
                        key={user.id}
                        className={styles.leaderboardRow}
                        onClick={() => navigate(`/user/${user.id}`)}
                    >
                        <div className={`${styles.rank} ${getRankClass(index)}`}>
                            {index + 1}
                        </div>
                        <div className={styles.user}>
                            <img src={imageUrl} alt={user.name} className={styles.avatar}/>
                            <span className={styles.name}>{user.name}</span>
                        </div>
                        <div className={`${styles.metric} ${getRankClass(index)}`}>
                            {user.metric.toLocaleString()}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
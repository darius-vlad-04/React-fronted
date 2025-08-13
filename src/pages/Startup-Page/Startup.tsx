import styles from "./Startup.module.css"
import Navbar from "../../components/Navbar/Navbar.tsx";
import {useStartupById} from "../../hooks/useStartupById.ts";
import {useParams} from "react-router-dom";
import userAvatarPlaceholder from '../../assets/user-avatar.jpg';
import {useUserById} from "../../hooks/useUserById.ts";
import {usePerksForStartup} from "../../hooks/usePerksForStartup.ts";
import PerksCard from "../../components/PerksCard/PerksCard.tsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.tsx";


export default function Startup() {
    const {id} = useParams();
    const BASE_BACKEND_URL = import.meta.env.VITE_API_URL;

    const {startup, isLoadingStartup, errorStartup} = useStartupById(id!);
    const founderId = startup?.founder_id || null;
    const {user, isLoadingUser, errorUser} = useUserById(founderId);
    const {perks, isLoadingPerks, errorPerks} = usePerksForStartup(id!);

    const imageUrl = `${BASE_BACKEND_URL}/uploads/${user?.profile_pic_path}`;

    if (isLoadingStartup || isLoadingUser) {

        return (
            <div className={styles['startup-page-wrapper']}>
                <Navbar/>
                <div className="loading-container">Loading startup details...</div>
            </div>
        );
    }

    if (errorStartup || errorUser) {
        return (
            <div className={styles['startup-page-wrapper']}>
                <Navbar/>
                <div className="error-container">Failed to load startup details.</div>
            </div>
        );
    }

    return (
        <div className={styles['startup-page-wrapper']}>
            <Navbar/>
            <div className={styles.parent}>

                <div className={styles.div1}>
                    <h3>Invest now in the future!</h3>
                    <h1>{startup?.name || "Loading..."}</h1>
                    <h2>{startup?.description || "Loading description..."}</h2>
                </div>

                <div className={styles.div2}>
                    <div className={styles['creator-info']}>
                        <div className={styles['profile-avatar']}>
                            <img src={user?.profile_pic_path === null ? userAvatarPlaceholder : imageUrl}
                                 alt={`${user?.name}'s profile`}/>
                            <div className={styles['avatar-overlay']}>
                                <span>{user?.name}</span>
                            </div>
                        </div>
                        <div>
                            <p>Created by</p>
                            <h3 className={styles['creator-name']}>{user?.name}</h3>
                        </div>
                    </div>
                    <div className={styles['funding-goal']}>
                        <p className={styles['funding-goal-description']}>
                            Current funding: {startup?.current_funding}$ / {startup?.funding_goal}$
                        </p>
                        <ProgressBar percentage={30}/>
                    </div>
                </div>

                <div className={styles.div3}>
                    <div className={styles['perks-grid-container']}>
                        {perks && perks.length > 0 ? (
                            perks.map(perk => (
                                <PerksCard
                                    key={perk.id}
                                    perk={perk}
                                />
                            ))
                        ) : (
                            <p>There are no perks yet!</p>
                        )}
                    </div>
                </div>

                <div className={styles.div4}>
                    <h3>Ready to contribute?</h3>
                    <button className={styles['donate-button']}>
                        Fund this Startup
                    </button>
                </div>
            </div>
        </div>
    );
}
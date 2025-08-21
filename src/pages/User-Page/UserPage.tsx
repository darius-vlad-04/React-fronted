import Navbar from "../../components/Navbar/Navbar.tsx";
import styles from "./UserPage.module.css";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader.tsx";
import {useParams} from "react-router-dom";
import {useUserById} from "../../hooks/useUserById.ts";
import UserStartups from "../../components/UserStartups/UserStartups.tsx";
import {useUserStats} from "../../hooks/useUserStats.ts";

export default function UserPage() {
    const {id} = useParams();
    const {user, isLoading, isError, mutateUser} = useUserById(id!);

    const userId = user?.id || null
    const {stats: stats, isLoading: isLoadingStats, isError: isErrorStats, mutateStats} = useUserStats(userId)

    if (isLoading) {
        return (
            <div className={styles['user-page']}>
                <Navbar/>
                <div className={styles['profile-container']}>Loading profile...</div>
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className={styles['user-page']}>
                <Navbar/>
                <div className={styles['profile-container']}>Failed to load user profile.</div>
            </div>
        );
    }

    return (
        <div className={styles['user-page']}>
            <Navbar/>
            <div className={styles['profile-container']}>
                <ProfileHeader user={user} mutateUser={mutateUser} stats={stats}/>
                <section className={styles['profile-description']}>
                    <div className={styles['description-upper']}>
                        <h2 className={styles['description-title']}>About {user.name}</h2>
                    </div>
                    <p className={styles['description-text']}>
                        {user.profile_bio || "This user hasn't written a bio yet."}
                    </p>
                </section>
                <UserStartups id={id!}/>
            </div>
        </div>
    );
}
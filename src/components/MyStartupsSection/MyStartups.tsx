import { useNavigate } from "react-router-dom";
import { useCurrentUserStartups } from "../../hooks/useCurrentUserStartups.ts";
import StartupCard from "../StartupCard/StartupCard.tsx";
import styles from "./MyStartups.module.css";

function MyStartups() {
    const { startups, isLoading, isError } = useCurrentUserStartups();
    const navigate = useNavigate();


    const handleNavigateToCreate = () => {
        navigate('/startup/create');
    };

    if (isLoading) {
        return <div>Loading startups...</div>;
    }

    if (isError) {
        return <div>Could not load your startups.</div>;
    }

    return (
        <section className={styles['startups-container']}>
            <div className={styles['startups-header']}>
                <h2 className={styles['startups-title']}>My Startups</h2>
                <button
                    className={styles['create-startup-button']}
                    onClick={handleNavigateToCreate}
                >
                    Create a Startup
                </button>
            </div>

            <div className={styles['startups-grid']}>
                {startups && startups.length > 0 ? (
                    startups.map(startup => (
                        <StartupCard
                            key={startup.id}
                            startup={startup}
                        />
                    ))
                ) : (
                    <p className={styles['no-startups-message']}>
                        You haven't created any startups yet.
                    </p>
                )}
            </div>
        </section>
    );
}

export default MyStartups;
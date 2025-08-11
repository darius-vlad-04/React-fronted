import StartupCard from "../StartupCard/StartupCard.tsx";
import "./UserStartups.css";
import {useStartupsForUserWithId} from "../../hooks/useStartupsForUserWithId.ts";

interface UserStartupsProps {
    id: string | null
}

function UserStartups({id}: UserStartupsProps) {
    const {startups, isLoading, isError} = useStartupsForUserWithId(id)

    if (isLoading) {
        return <div>Loading startups...</div>;
    }

    if (isError) {
        return <div>Could not load your startups.</div>;
    }

    return (
        <section className="startups-container">
            <h2 className="startups-title">My Startups</h2>

            <div className="startups-grid">
                {startups && startups.length > 0 ? (
                    startups.map(startup => (
                        <StartupCard
                            key={startup.id}
                            startup={startup}
                        />
                    ))
                ) : (

                    <p>You haven't created any startups yet.</p>
                )}
            </div>
        </section>
    );
}

export default UserStartups;
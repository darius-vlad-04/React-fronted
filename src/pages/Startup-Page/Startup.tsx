import "./Startup.css"
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

    const {user, isLoadingUser, errorUser} = useUserById(founderId)

    const {perks, isLoadingPerks, errorPerks} = usePerksForStartup(id!);

    const imageUrl = `${BASE_BACKEND_URL}/uploads/${user?.profile_pic_path}`;

   // const percentage: number = startup!.current_funding * 100 / startup!.funding_goal;



    if (isLoadingStartup || isLoadingUser) {
        return (
            <div className="startup-page-wrapper">
                <Navbar/>
                <div className="loading-container">Loading startup details...</div>
            </div>
        );
    }

    if (errorStartup || errorUser) {
        return (
            <div className="startup-page-wrapper">
                <Navbar/>
                <div className="error-container">Failed to load startup details.</div>
            </div>
        );
    }


    return (
        <div className="startup-page-wrapper">
            <Navbar/>
            <div className="parent">

                <div className="div1">
                    <h3>Invest now in the future!</h3>
                    <h1>{startup?.name || "Loading..."}</h1>
                    <h2>{startup?.description || "Loading description..."}</h2>
                </div>


                <div className="div2">
                    <div className="creator-info">
                        <div className="profile-avatar">
                            <img src={user?.profile_pic_path === null ? userAvatarPlaceholder : imageUrl}
                                 alt={`${user?.name}'s profile`}/>
                            <div className="avatar-overlay">
                                <span>{user?.name}</span>
                            </div>
                        </div>
                        <div>
                            <p>Created by</p>
                            <h3 className="creator-name">{user?.name}</h3>
                        </div>
                    </div>
                    <div className="funding-goal">
                        <p className="funding-goal-description">
                            Current funding: {startup?.current_funding}$ / {startup?.funding_goal}$
                        </p>
                        <ProgressBar percentage={30}/>
                    </div>
                </div>


                <div className="div3">
                    {perks && perks.length > 0 ? (
                        perks.map(perk => (
                            <PerksCard
                                key={perk.id}
                                perk={perk}
                            />
                        ))
                    ) : (
                        <p>There are no perks yet!.</p>
                    )}
                </div>


                <div className="div4">
                    <h3>Ready to contribute?</h3>
                    <button className="donate-button">
                        Fund this Startup
                    </button>
                </div>
            </div>
        </div>
    );
}
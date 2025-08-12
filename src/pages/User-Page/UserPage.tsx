
import Navbar from "../../components/Navbar/Navbar.tsx";


import "./UserPage.css";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader.tsx";
import {useParams} from "react-router-dom";
import {useUserById} from "../../hooks/useUserById.ts";
import UserStartups from "../../components/UserStartups/UserStartups.tsx";


export default function UserPage() {

    const {id} = useParams();
    const {user, isLoading, isError, mutateUser} = useUserById(id!);

    if (isLoading) {
        return (
            <div>
                <Navbar/>
                <div className="profile-container">Loading profile...</div>
            </div>
        );
    }

    return (
        <div>
            <Navbar/>
            <div className="profile-container">
                <ProfileHeader user={user} mutateUser={mutateUser}/>
                <section className="profile-description">
                    <div className="description-upper">
                        <h2 className="description-title">About Me</h2>
                    </div>
                    <p className="description-text">
                        {user?.profile_bio}
                    </p>
                </section>
                <UserStartups id={id!}></UserStartups>
            </div>
        </div>
    );

}
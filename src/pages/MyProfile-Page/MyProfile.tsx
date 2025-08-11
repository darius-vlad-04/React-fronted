import {useCurrentUser} from "../../hooks/useCurrentUser.ts";
import Navbar from "../../components/Navbar/Navbar.tsx";


import "./MyProfile.css";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader.tsx";
import MyStartups from "../../components/MyStartupsSection/MyStartups.tsx";
import {Button} from "@mui/material";



export default function MyProfilePage() {
    const {user, isLoading, isError, mutateUser} = useCurrentUser();

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
                        <Button className="edit-description-button" variant="contained" sx={{
                            fontWeight: 700,
                            backgroundColor: "red",
                        }}>Edit</Button>
                    </div>
                    <p className="description-text">
                        {user?.profile_bio}
                    </p>
                </section>
                <MyStartups></MyStartups>
            </div>
        </div>
    );

}
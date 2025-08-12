import {useState, useEffect} from "react";
import {useCurrentUser} from "../../hooks/useCurrentUser.ts";
import Navbar from "../../components/Navbar/Navbar.tsx";
import "./MyProfile.css";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader.tsx";
import MyStartups from "../../components/MyStartupsSection/MyStartups.tsx";
import {Button, TextField} from "@mui/material";
import {editProfileInfo} from "../../services/userService.ts";
import type {UserEditInterface} from "../../models/user-models/userEditInterface.ts";

export default function MyProfilePage() {
    const {user, isLoading, isError, mutateUser} = useCurrentUser();
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState(user?.profile_bio || "");

    useEffect(() => {
        if (user) {
            setBio(user.profile_bio || "");
        }
    }, [user]);

    if (isLoading) {
        return (
            <div>
                <Navbar/>
                <div className="profile-container">Loading profile...</div>
            </div>
        );
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleDoneClick = async () => {
        setIsEditing(false);
        const newUserData: UserEditInterface = {
            profile_bio: bio,
        };

        try {
            await editProfileInfo(newUserData);

            await mutateUser();
        } catch (error) {
            console.error("Failed to update profile:", error);

        }
    };

    const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBio(event.target.value);
    };

    return (
        <div>
            <Navbar/>
            <div className="profile-container">
                <ProfileHeader user={user} mutateUser={mutateUser}/>
                <section className="profile-description">
                    <div className="description-upper">
                        <h2 className="description-title">About Me</h2>
                        {isEditing ? (
                            <Button
                                className="edit-description-button"
                                variant="contained"
                                sx={{
                                    fontWeight: 700,
                                    backgroundColor: "green",
                                }}
                                onClick={handleDoneClick}
                            >
                                Done
                            </Button>
                        ) : (
                            <Button
                                className="edit-description-button"
                                variant="contained"
                                sx={{
                                    fontWeight: 700,
                                    backgroundColor: "red",
                                }}
                                onClick={handleEditClick}
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                    {isEditing ? (
                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            value={bio}
                            onChange={handleBioChange}
                        />
                    ) : (
                        <p className="description-text">{user?.profile_bio}</p>
                    )}
                </section>
                <MyStartups/>
            </div>
        </div>
    );
}
import {useState, useEffect} from "react";
import {useCurrentUser} from "../../hooks/useCurrentUser.ts";
import Navbar from "../../components/Navbar/Navbar.tsx";
import styles from "./MyProfile.module.css"
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader.tsx";
import MyStartups from "../../components/MyStartupsSection/MyStartups.tsx";
import {Button, TextField} from "@mui/material";
import {editProfileInfo} from "../../services/userService.ts";
import type {UserEditInterface} from "../../models/user-models/userEditInterface.ts";
import {useUserStats} from "../../hooks/useUserStats.ts";
import {useNavigate} from "react-router-dom";

export default function MyProfilePage() {
    const {user, isLoading, isError, mutateUser} = useCurrentUser();
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState(user?.profile_bio || "");


    const userId = user?.id || null
    const {stats: stats, isLoading: isLoadingStats, isError: isErrorStats, mutateStats} = useUserStats(userId)

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setBio(user.profile_bio || "");
        }
    }, [user]);

    if (isLoading) {
        return (
            <div>
                <Navbar/>
                <div className={styles['profile-container']}>Loading profile...</div>
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
        <div className={styles['my-profile-page']}>
            <Navbar/>
            <div className={styles['profile-container']}>
                <ProfileHeader user={user} mutateUser={mutateUser} stats={stats}/>
                <section className={styles['profile-description']}>
                    <div className={styles['description-upper']}>
                        <h2 className={styles['description-title']}>About Me</h2>
                        {isEditing ? (
                            <Button
                                className={styles['edit-description-button']}
                                variant="contained"
                                sx={{
                                    fontWeight: 700,
                                    backgroundColor: "#45a29e",
                                    '&:hover': {
                                        backgroundColor: "#66fcf1",
                                        color: '#0b0c10'
                                    },
                                }}
                                onClick={handleDoneClick}
                            >
                                Done
                            </Button>
                        ) : (
                            <Button
                                className={styles['edit-description-button']}
                                variant="outlined"
                                sx={{
                                    fontWeight: 700,
                                    borderColor: "#45a29e",
                                    color: "#c5c6c7",
                                    '&:hover': {
                                        borderColor: "#66fcf1",
                                        backgroundColor: 'rgba(102, 252, 241, 0.1)',
                                    },
                                }}
                                onClick={handleEditClick}
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                    {isEditing ? (
                        <TextField
                            className={styles['bio-textfield']}
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            value={bio}
                            onChange={handleBioChange}
                        />
                    ) : (
                        <p className={styles['description-text']}>
                            {user?.profile_bio || "No bio yet. Click 'Edit' to add one!"}
                        </p>
                    )}
                </section>
                <MyStartups/>
            </div>
        </div>
    );
}
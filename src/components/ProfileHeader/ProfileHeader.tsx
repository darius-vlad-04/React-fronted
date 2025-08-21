import type {UserInterface} from "../../models/user-models/userInterface.ts";
import userAvatarPlaceholder from '../../assets/user-avatar.jpg';
import styles from "./ProfileHeader.module.css";
import {formatDateToMonthYear} from "../../utils/dateFormatter.ts";
import type {KeyedMutator} from "swr";
import React, {useEffect, useRef, useState} from "react";

import {TextField, Button, IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {editProfileInfo, uploadProfilePicture} from "../../services/userService.ts";
import type {UserEditInterface} from "../../models/user-models/userEditInterface.ts";
import type {StatInterface} from "../../models/stats-models/statInterface.ts";

interface ProfileHeaderProps {
    user: UserInterface | undefined;
    mutateUser: KeyedMutator<UserInterface>;
    stats : StatInterface | undefined
}

function ProfileHeader({user, mutateUser , stats}: ProfileHeaderProps) {
    const BASE_BACKEND_URL = import.meta.env.VITE_API_URL;
    const imageUrl = `${BASE_BACKEND_URL}/uploads/${user?.profile_pic_path}`;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const [isNameEditing, setIsNameEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");

    useEffect(() => {
        if (user) {
            setName(user.name || "");
        }
    }, [user]);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        setIsUploading(true);
        setUploadError(null);

        const formData = new FormData();
        formData.append('profile-pic', file);

        try {
            await uploadProfilePicture(formData);
            await mutateUser();
        } catch (error) {
            setUploadError(error instanceof Error ? error.message : 'An unknown error occurred.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSaveName = async () => {
        const newUserData: UserEditInterface = {
            name: name
        };
        try {
            await editProfileInfo(newUserData);
            await mutateUser();
            setIsNameEditing(false);
        } catch (error) {
            console.error("Failed to update name:", error);
        }
    };

    const memberSince = formatDateToMonthYear(user?.created_at.toString());

    return (

        <div className={styles['profile-header-container']}>
            <div className={styles['profile-top-info']}>
                <div className={styles['profile-avatar']} onClick={handleAvatarClick}>
                    <img src={user?.profile_pic_path === null ? userAvatarPlaceholder : imageUrl}
                         alt={`${user?.name}'s profile`}/>
                    <div className={styles['avatar-overlay']}>
                        {isUploading ? <div className={styles.spinner}></div> : <span>Upload Photo</span>}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{display: 'none'}}
                        accept="image/png, image/jpeg, image/gif"
                    />
                </div>
                <div className={styles['profile-identity']}>
                    <div className={styles['name-editor']}>
                        {isNameEditing ? (
                            <>
                                <TextField
                                    variant="standard"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSaveName();
                                    }}
                                    sx={{
                                        '& .MuiInput-input': { color: '#ffffff' },
                                        '& .MuiInput-underline:before': { borderBottomColor: '#45a29e' },
                                        '& .MuiInput-underline:after': { borderBottomColor: '#66fcf1' },
                                    }}
                                />
                                <Button onClick={handleSaveName} size="small" sx={{ml: 1, color: '#66fcf1' }}>Save</Button>
                            </>
                        ) : (
                            <>
                                <h1 className={styles['user-name']}>{user?.name}</h1>
                                <IconButton
                                    onClick={() => setIsNameEditing(true)}
                                    size="small"
                                    sx={{
                                        ml: 1,
                                        color: '#c5c6c7',
                                        '&:hover': { color: '#66fcf1' }
                                    }}
                                >
                                    <EditIcon fontSize="small"/>
                                </IconButton>
                            </>
                        )}
                    </div>
                    <p className={styles['member-since']}>Member since: {memberSince}</p>
                </div>
            </div>

            <div className={styles['profile-stats']}>
                <div className={styles['stat-item']}>
                    <h3 className={styles['stat-value']}>{stats?.startups_created}</h3>
                    <p className={styles['stat-label']}>Startups Created</p>
                </div>
                <div className={styles['stat-item']}>
                    <h3 className={styles['stat-value']}>{stats?.startups_donated_to}</h3>
                    <p className={styles['stat-label']}>Startups Donated To</p>
                </div>
                <div className={styles['stat-item']}>
                    <h3 className={styles['stat-value']}>${stats?.money_raised}</h3>
                    <p className={styles['stat-label']}>Total Money Raised</p>
                </div>
                <div className={styles['stat-item']}>
                    <h3 className={styles['stat-value']}>${stats?.total_donated}</h3>
                    <p className={styles['stat-label']}>Total Donated</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
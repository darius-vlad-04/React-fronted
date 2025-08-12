import type { UserInterface } from "../../models/user-models/userInterface.ts";
import userAvatarPlaceholder from '../../assets/user-avatar.jpg';
import "./ProfileHeader.css";
import { formatDateToMonthYear } from "../../utils/dateFormatter.ts";
import type { KeyedMutator } from "swr";
import React, { useEffect, useRef, useState } from "react";


import { TextField, Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {editProfileInfo, uploadProfilePicture} from "../../services/userService.ts";
import type {UserEditInterface} from "../../models/user-models/userEditInterface.ts";


interface ProfileHeaderProps {
    user: UserInterface | undefined;
    mutateUser: KeyedMutator<UserInterface>;
}

function ProfileHeader({ user, mutateUser }: ProfileHeaderProps) {
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
        <div className="profile-header-container">
            <div className="profile-top-info">
                <div className="profile-avatar" onClick={handleAvatarClick}>
                    <img src={user?.profile_pic_path === null ? userAvatarPlaceholder : imageUrl} alt={`${user?.name}'s profile`} />
                    <div className="avatar-overlay">
                        {isUploading ? <div className="spinner"></div> : <span>Upload Photo</span>}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/png, image/jpeg, image/gif"
                    />
                </div>
                <div className="profile-identity">
                    <div className="name-editor">
                        {isNameEditing ? (
                            <>
                                <TextField
                                    variant="standard"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                    // Optional: save on Enter key press
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSaveName();
                                        }
                                    }}
                                />
                                <Button onClick={handleSaveName} size="small" sx={{ ml: 1 }}>Save</Button>
                            </>
                        ) : (
                            <>
                                <h1 className="user-name">{user?.name}</h1>
                                <IconButton onClick={() => setIsNameEditing(true)} size="small" sx={{ ml: 1 }}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </>
                        )}
                    </div>
                    <p className="member-since">Member since: {memberSince}</p>
                </div>
            </div>

            <div className="profile-stats">
                <div className="stat-item">
                    <h3 className="stat-value">900</h3>
                    <p className="stat-label">Startups Created</p>
                </div>
                <div className="stat-item">
                    <h3 className="stat-value">12</h3>
                    <p className="stat-label">Startups Donated To</p>
                </div>
                <div className="stat-item">
                    <h3 className="stat-value">$1.5M</h3>
                    <p className="stat-label">Total Money Raised</p>
                </div>
                <div className="stat-item">
                    <h3 className="stat-value">$25,000</h3>
                    <p className="stat-label">Total Donated</p>
                </div>
            </div>
            </div>
    );
}

export default ProfileHeader;
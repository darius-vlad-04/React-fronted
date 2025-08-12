import type {UserInterface} from "../../../models/user-models/userInterface.ts";
import userAvatarPlaceholder from "../../../assets/user-avatar.jpg";
import React from "react";

interface CreatorPresentationProps {
    user: UserInterface | null
}

function CreatorPresentation({user}: CreatorPresentationProps) {
    return (
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
            <div className="funding-stat">
                <h4>Funds Raised</h4>
                <p className="funding-value">{startup?.current_funding}$</p>
            </div>
            <div className="funding-stat">
                <h4>Funding Goal</h4>
                <p className="funding-value">{startup?.funding_goal}$</p>
            </div>
        </div>
    )
}


export default CreatorPresentation
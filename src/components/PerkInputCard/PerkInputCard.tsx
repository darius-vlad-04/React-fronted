import React from 'react';
import {TextField, Button} from '@mui/material';
import './PerkInputCard.css';
import type {PerkCreationInterface} from "../../models/perk-models/perkCreationInterface.ts";


interface PerkInputCardProps {
    index: number;
    perk: PerkCreationInterface;
    onChange: (index: number, field: keyof PerkCreationInterface, value: string) => void;
    onRemove: (index: number) => void;
}

export default function PerkInputCard({index, perk, onChange, onRemove}: PerkInputCardProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(index, e.target.name as keyof PerkCreationInterface, e.target.value);
    };

    return (
        <div className="perk-input-card-container">
            <TextField
                name="minimum_donation_amount"
                label="Donation Amount"
                type="number"
                variant="standard"
                className="perk-input-donation"
                value={perk.minimum_donation_amount}
                onChange={handleChange}
                InputProps={{startAdornment: <span>$</span>}}
            />
            <TextField
                name="title"
                label="Perk Title"
                variant="standard"
                className="perk-input-title"
                value={perk.title}
                onChange={handleChange}
            />
            <TextField
                name="description"
                label="Perk Description"
                variant="outlined"
                multiline
                rows={6}
                className="perk-input-description"
                value={perk.description}
                onChange={handleChange}
            />
            <Button color="error" variant="text" onClick={() => onRemove(index)}>
                Remove Perk
            </Button>
        </div>
    );
}
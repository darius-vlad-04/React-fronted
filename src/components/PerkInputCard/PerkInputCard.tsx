import React from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';

import styles from './PerkInputCard.module.css';
import type { PerkCreationInterface } from "../../models/perk-models/perkCreationInterface.ts";

interface PerkInputCardProps {
    index: number;
    perk: PerkCreationInterface;
    onChange: (index: number, field: keyof PerkCreationInterface, value: string) => void;
    onRemove: (index: number) => void;
}

export default function PerkInputCard({ index, perk, onChange, onRemove }: PerkInputCardProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(index, e.target.name as keyof PerkCreationInterface, e.target.value);
    };

    return (

        <div className={styles['perk-input-card-container']}>
            <TextField
                name="minimum_donation_amount"
                label="Donation Amount"
                type="number"
                variant="standard"
                className={styles['perk-input-donation']}
                value={perk.minimum_donation_amount}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><span>$</span></InputAdornment>,
                }}
            />
            <TextField
                name="title"
                label="Perk Title"
                variant="standard"
                className={styles['perk-input-title']}
                value={perk.title}
                onChange={handleChange}
            />
            <TextField
                name="description"
                label="Perk Description"
                variant="outlined"
                multiline
                rows={4}
                className={styles['perk-input-description']}
                value={perk.description}
                onChange={handleChange}
            />
            <Button
                variant="text"
                onClick={() => onRemove(index)}

                sx={{
                    color: '#f472b6',
                    '&:hover': {
                        backgroundColor: 'rgba(244, 114, 182, 0.1)',
                    },
                }}
            >
                Remove Perk
            </Button>
        </div>
    );
}
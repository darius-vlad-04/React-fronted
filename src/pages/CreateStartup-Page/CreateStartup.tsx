import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.tsx';
import {TextField, Button, InputAdornment, CircularProgress, Chip, Box} from '@mui/material';


import styles from './CreateStartup.module.css';
import PerkInputCard from "../../components/PerkInputCard/PerkInputCard.tsx";
import AddPerkCard from "../../components/AddPerkCard/AddPerkCard.tsx";
import type {PerkCreationInterface} from "../../models/perk-models/perkCreationInterface.ts";
import {useCurrentUser} from "../../hooks/useCurrentUser.ts";
import type {StartupCreationInterface} from "../../models/startup-models/startupCreationInterface.ts";
import {createStartup} from "../../services/startupService.ts";
import {createPerk} from "../../services/perkService.ts";


export default function CreateStartupPage() {
    const navigate = useNavigate();
    const {user, isLoading: isLoadingUser} = useCurrentUser();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [fundingGoal, setFundingGoal] = useState<number | string>('');
    const [perks, setPerks] = useState<PerkCreationInterface[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);


    const darkTextFieldStyles = {
        '& .MuiInputBase-input': { color: '#ffffff' },
        '& .MuiInputLabel-root': { color: '#8f9296' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#66fcf1' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#45a29e' },
            '&:hover fieldset': { borderColor: '#66fcf1' },
            '&.Mui-focused fieldset': { borderColor: '#66fcf1' },
        },
        '& .MuiFormHelperText-root': { color: '#8f9296' },
    };



    const handleAddPerk = () => {
        setPerks([...perks, {title: '', description: '', minimum_donation_amount: 0}]);
    };
    const handleRemovePerk = (index: number) => {
        setPerks(perks.filter((_, i) => i !== index));
    };
    const handlePerkChange = (index: number, field: keyof PerkCreationInterface, value: string) => {
        const newPerks = perks.map((perk, i) => {
            if (i === index) {
                const updatedPerk = {...perk};
                if (field === 'minimum_donation_amount') {
                    updatedPerk[field] = parseInt(value, 10) || 0;
                } else {
                    updatedPerk[field] = value;
                }
                return updatedPerk;
            }
            return perk;
        });
        setPerks(newPerks);
    };

    const handleTagKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const newTag = currentTag.trim();

            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }

            setCurrentTag('');
        }
    };

    const handleDeleteTag = (tagToDelete: string) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!user) {
            setSubmitError("You must be logged in to create a startup.");
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const startupPayload: StartupCreationInterface = {
                founder_id: user.id,
                name,
                description,
                funding_goal: Number(fundingGoal),
                tags: tags,
            };

            const newStartup = await createStartup(startupPayload);


            if (perks.length > 0) {

                const perkCreationPromises = perks.map(perk =>
                    createPerk(perk, newStartup.id)
                );

                await Promise.all(perkCreationPromises);
            }
            navigate(`/startup/${newStartup.id}`);

        } catch (error) {

            setSubmitError(error instanceof Error ? error.message : "An unknown error occurred.");
        } finally {

            setIsSubmitting(false);
        }
    };

    if (isLoadingUser) {
        return (
            <div className={styles['create-startup-wrapper']}>
                <Navbar/>
                <div className={styles['loading-container']}>Loading...</div>
            </div>
        );
    }

    return (
        <div className={styles['create-startup-wrapper']}>
            <Navbar/>
            <form onSubmit={handleSubmit} className={styles.parent}>

                <div className={`${styles.div1} ${styles['form-section']}`}>
                    <h3>Create Your Startup</h3>
                    <p className={styles['form-subtitle']}>Bring your vision to life. Start with a compelling name, description, and tags.</p>
                    <TextField
                        label="Startup Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        helperText="What is your project called?"
                        sx={darkTextFieldStyles}
                    />
                    <TextField
                        label="Startup Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={8}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        helperText="Provide a detailed description of your vision."
                        sx={darkTextFieldStyles}
                    />

                    <div className={styles['tags-section']}>
                        <TextField
                            label="Tags (press Enter to add)"
                            variant="outlined"
                            fullWidth
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            helperText="Add relevant tags to improve discoverability."
                            sx={darkTextFieldStyles}
                        />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1.5 }}>
                            {tags.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    onDelete={() => handleDeleteTag(tag)}
                                    variant="outlined"
                                    sx={{
                                        color: '#c5c6c7',
                                        borderColor: '#45a29e',
                                        '&:hover': {
                                            backgroundColor: 'rgba(102, 252, 241, 0.1)',
                                            borderColor: '#66fcf1',
                                        },
                                        '& .MuiChip-deleteIcon': {
                                            color: '#8f9296',
                                            '&:hover': { color: '#66fcf1' },
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    </div>
                </div>

                <div className={`${styles.div2} ${styles['form-section']}`}>
                    <h3>Funding Goal</h3>
                    <p className={styles['form-subtitle']}>Set a funding goal for your project.</p>
                    <div className={styles['preset-buttons']}>
                        <Button variant={fundingGoal === 25000 ? "contained" : "outlined"} onClick={() => setFundingGoal(25000)}>$25k</Button>
                        <Button variant={fundingGoal === 50000 ? "contained" : "outlined"} onClick={() => setFundingGoal(50000)}>$50k</Button>
                        <Button variant={fundingGoal === 100000 ? "contained" : "outlined"} onClick={() => setFundingGoal(100000)}>$100k</Button>
                        <Button variant={fundingGoal === 500000 ? "contained" : "outlined"} onClick={() => setFundingGoal(500000)}>$500k</Button>
                    </div>
                    <TextField
                        label="Custom Funding Goal"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={fundingGoal}
                        onChange={(e) => setFundingGoal(e.target.value)}
                        required
                        InputProps={{
                            startAdornment: <InputAdornment position="start" sx={{ color: '#ffffff !important' }}>$</InputAdornment>,
                        }}
                        sx={darkTextFieldStyles}
                    />
                </div>

                <div className={`${styles.div3} ${styles['form-section']}`}>
                    <h3>Investment Perks</h3>
                    <p className={styles['form-subtitle']}>Reward your backers with unique perks for different contribution levels.</p>
                    <div className={styles['perks-grid-container']}>
                        {perks.map((perk, index) => (
                            <PerkInputCard key={index} index={index} perk={perk} onChange={handlePerkChange} onRemove={handleRemovePerk} />
                        ))}
                        <AddPerkCard onClick={handleAddPerk}/>
                    </div>
                </div>

                <div className={`${styles.div4} ${styles['form-section']}`}>
                    <h3>Ready to Go?</h3>
                    <p className={styles['form-subtitle']}>Review your details and launch your campaign to the world!</p>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        className={styles['create-startup-button']}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit"/> : "Launch My Startup"}
                    </Button>
                    {submitError && <p className={styles['submit-error']}>{submitError}</p>}
                </div>
            </form>
        </div>
    );
}
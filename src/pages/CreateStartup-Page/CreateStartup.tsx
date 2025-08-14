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
        return <div>Loading user...</div>;
    }


    return (
        <div className={styles['create-startup-wrapper']}>
            <Navbar/>
            <form onSubmit={handleSubmit} className={styles.parent}>

                <div className={`${styles.div1} ${styles['form-section']}`}>
                    <h3>Create Your Startup</h3>
                    <p className={styles['form-subtitle']}>Start with a compelling name and description.</p>
                    <TextField
                        label="Startup Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        helperText="What is your project called?"
                        sx={{

                            '& .MuiInputBase-input': {
                                color: 'white',
                            },

                            '& .MuiInputLabel-root': {
                                color: 'rgba(255, 255, 255, 0.7)',
                            },

                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white',
                            },

                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                },

                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },

                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },

                            '& .MuiFormHelperText-root': {
                                color: 'rgba(255, 255, 255, 0.6)',
                            },
                        }}
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
                        sx={{
                            '& .MuiInputBase-input': {color: 'white'},
                            '& .MuiInputLabel-root': {color: 'rgba(255, 255, 255, 0.7)'},
                            '& .MuiInputLabel-root.Mui-focused': {color: 'white'},
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {borderColor: 'rgba(255, 255, 255, 0.5)'},
                                '&:hover fieldset': {borderColor: 'white'},
                                '&.Mui-focused fieldset': {borderColor: 'white'},
                            },
                            '& .MuiFormHelperText-root': {color: 'rgba(255, 255, 255, 0.6)'},
                        }}
                    />

                    <div className={styles['tags-section']}>
                        <TextField
                            label="Tags (press Enter to add)"
                            variant="outlined"
                            fullWidth
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyDown={handleTagKeyDown} // Important: handles the Enter key
                            helperText="Add relevant tags to improve discoverability."
                            sx={{
                                '& .MuiInputBase-input': {color: 'white'},
                                '& .MuiInputLabel-root': {color: 'rgba(255, 255, 255, 0.7)'},
                                '& .MuiInputLabel-root.Mui-focused': {color: 'white'},
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {borderColor: 'rgba(255, 255, 255, 0.5)'},
                                    '&:hover fieldset': {borderColor: 'white'},
                                    '&.Mui-focused fieldset': {borderColor: 'white'},
                                },
                                '& .MuiFormHelperText-root': {color: 'rgba(255, 255, 255, 0.6)'},
                            }}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 0.5,
                                marginTop: 1,
                            }}
                        >

                            {tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    onDelete={() => handleDeleteTag(tag)}
                                    variant="outlined"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.87)',
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                            borderColor: 'rgba(255, 255, 255, 0.87)',
                                        },
                                        '& .MuiChip-deleteIcon': {
                                            color: 'rgba(255, 255, 255, 0.5)',
                                            '&:hover': {
                                                color: 'rgba(255, 255, 255, 0.87)',
                                            },
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    </div>

                </div>

                <div className={`${styles.div2} ${styles['form-section']}`}>
                    <h3>Funding Details</h3>
                    <div className={styles['preset-buttons']}>
                        <Button variant="outlined" onClick={() => setFundingGoal(25000)}>$25k</Button>
                        <Button variant="outlined" onClick={() => setFundingGoal(50000)}>$50k</Button>
                        <Button variant="outlined" onClick={() => setFundingGoal(100000)}>$100k</Button>
                        <Button variant="outlined" onClick={() => setFundingGoal(500000)}>$500k</Button>
                    </div>
                    <TextField
                        label="Custom Funding Goal"
                        type="number"
                        value={fundingGoal}
                        onChange={(e) => setFundingGoal(e.target.value)}
                        required
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                </div>


                <div className={`${styles.div3} ${styles['form-section']}`}>
                    <h3>Investment Perks</h3>
                    <div className={styles['perks-grid-container']}>
                        {perks.map((perk, index) => (
                            <PerkInputCard
                                key={index}
                                index={index}
                                perk={perk}
                                onChange={handlePerkChange}
                                onRemove={handleRemovePerk}
                            />
                        ))}
                        <AddPerkCard onClick={handleAddPerk}/>
                    </div>
                </div>


                <div className={`${styles.div4} ${styles['form-section']}`}>
                    <h3>Ready to Go?</h3>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        className={styles['create-startup-button']}
                        disabled={isSubmitting}>
                        {isSubmitting ? <CircularProgress size={24} color="inherit"/> : "Save and Continue"}
                    </Button>

                    {submitError && <p className={styles['submit-error']}>{submitError}</p>}
                </div>
            </form>
        </div>
    );
}
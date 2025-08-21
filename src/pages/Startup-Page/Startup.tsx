import styles from "./Startup.module.css"
import Navbar from "../../components/Navbar/Navbar.tsx";
import {useStartupById} from "../../hooks/useStartupById.ts";
import {useNavigate, useParams} from "react-router-dom";
import userAvatarPlaceholder from '../../assets/user-avatar.jpg';
import {useUserById} from "../../hooks/useUserById.ts";
import {usePerksForStartup} from "../../hooks/usePerksForStartup.ts";
import PerksCard from "../../components/PerksCard/PerksCard.tsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.tsx";
import TagContainer from "../../components/TagContainer/TagContainer.tsx";
import {useState} from "react";
import {createDonation} from "../../services/donationService.ts";
import {Button, CircularProgress, InputAdornment, TextField} from "@mui/material";


export default function Startup() {
    const {id} = useParams();
    const BASE_BACKEND_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const {startup: startup, isLoading: isLoadingStartup, isError: errorStartup, mutateStartup} = useStartupById(id!);

    const founderId = startup?.founder_id || null;
    const {user, isLoading: isLoadingUser, isError: errorUser} = useUserById(founderId);
    const {perks, isLoading: isLoadingPerks, isError: errorPerks} = usePerksForStartup(id!);


    const imageUrl = `${BASE_BACKEND_URL}/uploads/${user?.profile_pic_path}`;

    const [isDonating, setIsDonating] = useState(false);
    const [donationAmount, setDonationAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [donationError, setDonationError] = useState<string | null>(null);


    const handleFundClick = () => {
        setIsDonating(true);
    };

    const handleCancelDonation = () => {
        setIsDonating(false);
        setDonationAmount('');
        setDonationError(null);
    };

    const handleConfirmDonation = async () => {
        const amount = Number(donationAmount);
        if (!amount || amount <= 0) {
            setDonationError("Please enter a valid donation amount.");
            return;
        }

        setIsSubmitting(true);
        setDonationError(null);

        try {

            await createDonation({amount: amount, startup_id: startup!.id})
            await mutateStartup();


            handleCancelDonation();

        } catch (error) {
            setDonationError(error instanceof Error ? error.message : "An unknown error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoadingStartup || isLoadingUser) {

        return (
            <div className={styles['startup-page-wrapper']}>
                <Navbar/>
                <div className="loading-container">Loading startup details...</div>
            </div>
        );
    }

    if (errorStartup || errorUser) {
        return (
            <div className={styles['startup-page-wrapper']}>
                <Navbar/>
                <div className="error-container">Failed to load startup details.</div>
            </div>
        );
    }

    return (
        <div className={styles['startup-page-wrapper']}>
            <Navbar/>
            <div className={styles.parent}>

                <div className={styles.div1}>
                    <h3>Invest now in the future!</h3>
                    <h1>{startup?.name || "Loading..."}</h1>
                    <h2>{startup?.description || "Loading description..."}</h2>
                    <TagContainer tags={startup?.tags || []}/>
                </div>

                <div className={styles.div2}>
                    <div className={styles['creator-info']}>
                        <div className={styles['profile-avatar']}>
                            <img src={user?.profile_pic_path === null ? userAvatarPlaceholder : imageUrl}
                                 alt={`${user?.name}'s profile`}/>
                            <div className={styles['avatar-overlay']} onClick={() => {
                                console.log(founderId)
                                if (founderId) {
                                    navigate(`/user/${founderId}`);
                                }
                            }}>
                                <span>{user?.name}</span>
                            </div>
                        </div>
                        <div>
                            <p>Created by</p>
                            <h3 className={styles['creator-name']}>{user?.name}</h3>
                        </div>
                    </div>
                    <div className={styles['funding-goal']}>
                        <p className={styles['funding-goal-description']}>
                            Current funding: {startup?.current_funding}$ / {startup?.funding_goal}$
                        </p>
                        <ProgressBar percentage={startup!.current_funding * 100 / startup!.funding_goal}/>
                    </div>
                </div>

                <div className={styles.div3}>
                    <div className={styles['perks-grid-container']}>
                        {perks && perks.length > 0 ? (
                            perks.map(perk => (
                                <PerksCard
                                    key={perk.id}
                                    perk={perk}
                                />
                            ))
                        ) : (
                            <p>There are no perks yet!</p>
                        )}
                    </div>
                </div>

                <div className={styles.div4}>
                    {isDonating ? (
                        <>
                            <h3>Enter Your Contribution</h3>
                            <div className={styles['donation-form']}>
                                <TextField
                                    label="Donation Amount"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={donationAmount}
                                    onChange={(e) => setDonationAmount(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"
                                                                        sx={{color: '#ffffff'}}>$</InputAdornment>,
                                    }}
                                    sx={{
                                        width: "80%",
                                        '& .MuiInputBase-input': {
                                            color: '#ffffff',
                                        },

                                        '& .MuiInputLabel-root': {
                                            color: '#8f9296',
                                        },

                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#66fcf1',
                                        },

                                        '& .MuiOutlinedInput-root': {

                                            '& fieldset': {
                                                borderColor: '#45a29e',
                                            },

                                            '&:hover fieldset': {
                                                borderColor: '#66fcf1',
                                            },

                                            '&.Mui-focused fieldset': {
                                                borderColor: '#66fcf1',
                                            },
                                        },
                                    }}
                                />
                                <div className={styles['donation-actions']}>

                                    <Button
                                        variant="outlined"
                                        onClick={handleCancelDonation}
                                        disabled={isSubmitting}
                                        sx={{ // Custom themed "Cancel" button
                                            flexGrow: 1,
                                            fontWeight: 600,
                                            borderColor: '#45a29e',
                                            color: '#c5c6c7',
                                            '&:hover': {
                                                borderColor: '#66fcf1',
                                                backgroundColor: 'rgba(102, 252, 241, 0.1)',
                                            },
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleConfirmDonation}
                                        disabled={isSubmitting}
                                        sx={{ // Custom themed "Confirm" button
                                            flexGrow: 1,
                                            fontWeight: 600,
                                            background: 'linear-gradient(to right, #45a29e, #66fcf1)',
                                            color: '#0b0c10',
                                            '&.Mui-disabled': { // Style for disabled state
                                                background: '#2e3a48',
                                                color: '#8f9296',
                                            },
                                        }}
                                    >
                                        {isSubmitting ? <CircularProgress size={24} color="inherit"/> : 'Confirm'}
                                    </Button>
                                </div>
                                {donationError && <p className={styles['donation-error']}>{donationError}</p>}
                            </div>
                        </>
                    ) : (
                        <>
                            <h3>Ready to contribute?</h3>
                            <button className={styles['donate-button']} onClick={handleFundClick}>
                                Fund this Startup
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
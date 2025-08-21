import type {PerkInterface} from "../../models/perk-models/perkInterface.ts";

import styles from './PerksCard.module.css';

interface PerksCardProps {
    perk: PerkInterface | null;
}

function PerksCard({perk}: PerksCardProps) {
    if (!perk) {
        return <div className={styles['perk-card-container']}>Loading...</div>;
    }

    return (
        <div className={styles['perk-card-container']}>
            <h1 className={styles['perk-card-donation-amount']}>
                ${perk.minimum_donation_amount}
            </h1>
            <h2 className={styles['perk-card-title']}>
                {perk.title}
            </h2>

            <h3 className={styles['perk-card-description']}>
                {perk.description}
            </h3>

            <button className={styles['perk-card-select-button']}>
                Select
            </button>
        </div>
    );
}

export default PerksCard;
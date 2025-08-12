import type {PerkInterface} from "../../models/perk-models/perkInterface.ts";
import './PerksCard.css';

interface PerksCardProps {
    perk: PerkInterface | null;
}

function PerksCard({perk}: PerksCardProps) {
    if (!perk) {
        return <div className="perk-card-container">Loading...</div>;
    }

    return (
        <div className="perk-card-container">
            <h1 className="perk-card-donation-amount">
                ${perk.minimum_donation_amount}
            </h1>
            <h2 className="perk-card-title">
                {perk.title}
            </h2>

            <h3 className="perk-card-description">
                {perk.description}
            </h3>

            <button className="perk-card-select-button">
                Select
            </button>
        </div>
    );
}

export default PerksCard;
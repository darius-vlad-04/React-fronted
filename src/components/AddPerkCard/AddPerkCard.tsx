import AddIcon from '@mui/icons-material/Add';
import './AddPerkCard.css';

interface AddPerkCardProps {
    onClick: () => void;
}

export default function AddPerkCard({onClick}: AddPerkCardProps) {
    return (
        <div className="add-perk-card-container" onClick={onClick}>
            <AddIcon className="add-perk-icon"/>
            <p>Add a Perk</p>
        </div>
    );
}
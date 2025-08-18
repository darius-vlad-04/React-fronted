import styles from './FilterPanel.module.css';
import { FaTimes } from 'react-icons/fa';
import React from 'react';


export interface Filters {
    sortBy: 'newest' | 'oldest' | 'funding_asc' | 'funding_desc';
    categories: string[];
}

interface FilterPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters: (filters: Filters) => void;
}

const availableCategories = ['Technology', 'Sports', 'Healthcare', 'Finance', 'Art', 'Gaming'];

export default function FilterPanel({ isOpen, onClose, onApplyFilters }: FilterPanelProps) {
    const [sortBy, setSortBy] = React.useState<Filters['sortBy']>('newest');
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleApply = () => {
        onApplyFilters({ sortBy, categories: selectedCategories });
        onClose();
    };


    if (!isOpen) {
        return null;
    }

    return (

        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>Filters</h2>
                    <button onClick={onClose} className={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div className={styles.content}>
                    <div className={styles.filterSection}>
                        <h3 className={styles.sectionTitle}>Sort By</h3>
                        <div className={styles.optionsContainer}>
                            <label className={styles.radioLabel}>
                                <input type="radio" name="sort" value="newest" checked={sortBy === 'newest'} onChange={(e) => setSortBy(e.target.value as Filters['sortBy'])} />
                                <span className={styles.customRadio}></span>
                                Newest
                            </label>
                            <label className={styles.radioLabel}>
                                <input type="radio" name="sort" value="oldest" checked={sortBy === 'oldest'} onChange={(e) => setSortBy(e.target.value as Filters['sortBy'])} />
                                <span className={styles.customRadio}></span>
                                Oldest
                            </label>
                            <label className={styles.radioLabel}>
                                <input type="radio" name="sort" value="funding_asc" checked={sortBy === 'funding_asc'} onChange={(e) => setSortBy(e.target.value as Filters['sortBy'])} />
                                <span className={styles.customRadio}></span>
                                Funding: Low to High
                            </label>
                            <label className={styles.radioLabel}>
                                <input type="radio" name="sort" value="funding_desc" checked={sortBy === 'funding_desc'} onChange={(e) => setSortBy(e.target.value as Filters['sortBy'])} />
                                <span className={styles.customRadio}></span>
                                Funding: High to Low
                            </label>
                        </div>
                    </div>

                    <div className={styles.filterSection}>
                        <h3 className={styles.sectionTitle}>Categories</h3>
                        <div className={styles.optionsContainer}>
                            {availableCategories.map(category => (
                                <label key={category} className={styles.checkboxLabel}>
                                    <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleCategoryChange(category)} />
                                    <span className={styles.customCheckbox}></span>
                                    {category}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <button onClick={handleApply} className={styles.applyButton}>Apply Filters</button>
                </div>
            </div>
        </div>
    );
}
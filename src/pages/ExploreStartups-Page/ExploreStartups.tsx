import Navbar from "../../components/Navbar/Navbar.tsx";
import styles from "./ExploreStartups.module.css";
import {FaFilter, FaSearch} from "react-icons/fa";
import {useShowcaseStartups} from "../../hooks/useShowcaseStartups.ts";
import StartupCarousel from "../../components/StartupCarousel/StartupCarousel.tsx";
import {useEffect, useState} from "react";
import StartupExploreCard from "../../components/StartupExploreCard/StartupExploreCard.tsx";
import FilterPanel, {type Filters} from "../../components/FilterPanel/FilterPanel.tsx";
import {useFilteredStartups} from "../../hooks/useFilteredStartups.ts";
import {useNavigate, useSearchParams} from "react-router-dom"; // The new hook

export default function ExploreStartups() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const searchQuery = searchParams.get('q') || '';
    const activeFilters: Filters | null = searchParams.has('sortBy')
        ? {
            sortBy: searchParams.get('sortBy') as Filters['sortBy'],
            categories: searchParams.get('categories')?.split('-') || [],
        }
        : null;


    const [searchTerm, setSearchTerm] = useState(searchQuery);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);


    const { startups: mostFundedStartups, isLoading: isLoadingMostFunded } = useShowcaseStartups("most-donated");
    const { startups: newestStartups, isLoading: isLoadingNewest } = useShowcaseStartups("recent");
    const { startups: gridStartups, isLoading: isLoadingGrid } = useFilteredStartups(activeFilters, searchQuery);


    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const newParams = new URLSearchParams();
            if (searchTerm) {
                newParams.set('q', searchTerm);
            }

            setSearchParams(newParams);
        }
    };

    const handleApplyFilters = (filters: Filters) => {
        const newParams = new URLSearchParams();
        newParams.set('sortBy', filters.sortBy);
        if (filters.categories.length > 0) {
            newParams.set('categories', filters.categories.join('-'));
        }
        setSearchParams(newParams);
        setSearchTerm('');
    };

    const clearAll = () => {

        navigate('/explore');
    };


    useEffect(() => {
        setSearchTerm(searchQuery);
    }, [searchQuery]);


    const renderGridView = () => {
        let title = "Results";
        if (activeFilters && searchQuery) {
            title = `Search Results for "${searchQuery}" (Filtered)`;
        } else if (searchQuery) {
            title = `Search Results for "${searchQuery}"`;
        } else if (activeFilters) {
            title = "Filtered Results";
        }

        return (
            <section className={styles['startup-section']}>
                <div className={styles['search-results-header']}>
                    <h2 className={styles['section-title']}>{title}</h2>
                    <button onClick={clearAll} className={styles['clear-search-button']}>Clear All</button>
                </div>

                {isLoadingGrid ? (
                    <div className={styles['carousel-placeholder']}><p>Loading Results...</p></div>
                ) : gridStartups && gridStartups.length > 0 ? (
                    <div className={styles['search-results-grid']}>
                        {gridStartups.map(startup => (
                            <StartupExploreCard key={startup.id} startup={startup}/>
                        ))}
                    </div>
                ) : (
                    <p>No startups found. Try adjusting your search or filters.</p>
                )}
            </section>
        );
    };

    const renderDefaultView = () => (
        <>
            <section className={styles['startup-section']}>
                <h2 className={styles['section-title']}>Most Funded Startups</h2>
                {isLoadingMostFunded ? (
                    <div className={styles['carousel-placeholder']}><p>Loading...</p></div>
                ) : (
                    <StartupCarousel startups={mostFundedStartups}/>
                )}
            </section>
            <section className={styles['startup-section']}>
                <h2 className={styles['section-title']}>Newest Ventures</h2>
                {isLoadingNewest ? (
                    <div className={styles['carousel-placeholder']}><p>Loading...</p></div>
                ) : (
                    <StartupCarousel startups={newestStartups}/>
                )}
            </section>
        </>
    );


    const isGridView = activeFilters || searchQuery;

    return (
        <div className={styles['page-wrapper']}>
            <Navbar/>
            <FilterPanel
                isOpen={isFilterPanelOpen}
                onClose={() => setIsFilterPanelOpen(false)}
                onApplyFilters={handleApplyFilters}
            />
            <main className={styles['explore-container']}>
                <div className={styles['explore-upper-row']}>
                    <div className={styles['search-bar-wrapper']}>
                        <FaSearch className={styles['search-icon']}/>
                        <input
                            type="text"
                            className={styles['search-input']}
                            placeholder="Search or filter results..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                        />
                    </div>
                    <button onClick={() => setIsFilterPanelOpen(true)} className={styles['filter-button']}>
                        <FaFilter className={styles['filter-icon']}/>
                        <span>Filter</span>
                    </button>
                </div>


                {isGridView ? renderGridView() : renderDefaultView()}
            </main>
        </div>
    );
}
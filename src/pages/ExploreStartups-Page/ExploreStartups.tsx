import Navbar from "../../components/Navbar/Navbar.tsx";
import styles from "./ExploreStartups.module.css"
import {FaFilter, FaSearch} from "react-icons/fa";
import {useShowcaseStartups} from "../../hooks/useShowcaseStartups.ts";
import StartupCarousel from "../../components/StartupCarousel/StartupCarousel.tsx";
import {useSearchStartups} from "../../hooks/useSearchStartups.ts";
import {useState} from "react";
import StartupExploreCard from "../../components/StartupExploreCard/StartupExploreCard.tsx";
import FilterPanel, {type Filters} from "../../components/FilterPanel/FilterPanel.tsx";

export default function ExploreStartups() {


    const [searchTerm, setSearchTerm] = useState('');

    const [searchQuery, setSearchQuery] = useState('');

    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

    const [activeFilters, setActiveFilters] = useState<Filters | null>(null);

    const {startups: mostFundedStartups, isLoading :isLoadingMostFunded, isErrorMostFunded} = useShowcaseStartups("most-donated");

    const {startups: newestStartups, isLoading: isLoadingNewestStartups, isErrorNewestStartups} = useShowcaseStartups("recent")

    const {startups: searchedStartups, isLoading: isLoadingSearchStartups, isErrorSearchStartups} = useSearchStartups(searchQuery)

    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setSearchQuery(searchTerm);
        }
    };

    const handleApplyFilters = (filters: Filters) => {
        setSearchQuery('');
        setSearchTerm('');
        setActiveFilters(filters);
    };

    const clearAll = () => {
        setSearchTerm('');
        setSearchQuery('');
        setActiveFilters(null);
    };


    const renderSearchResults = () => (
        <section className={styles['startup-section']}>
            <div className={styles['search-results-header']}>
                <h2 className={styles['section-title']}>
                    Search Results for "{searchQuery}"
                </h2>
                <button onClick={clearAll} className={styles['clear-search-button']}>Clear Search</button>
            </div>

            {isLoadingSearchStartups ? (
                <div className={styles['carousel-placeholder']}><p>Searching...</p></div>
            ) : searchedStartups && searchedStartups.length > 0 ? (
                <div className={styles['search-results-grid']}>
                    {searchedStartups.map(startup => (
                        <StartupExploreCard key={startup.id} startup={startup}/>
                    ))}
                </div>
            ) : (
                <p>No startups found matching your search.</p>
            )}
        </section>
    );


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
                {isLoadingNewestStartups ? (
                    <div className={styles['carousel-placeholder']}><p>Loading...</p></div>
                ) : (
                    <StartupCarousel startups={newestStartups}/>
                )}
            </section>

            <section className={styles['startup-section']}>
                <h2 className={styles['section-title']}>Trending in Technology</h2>
                {isLoadingNewestStartups ? (
                    <div className={styles['carousel-placeholder']}><p>Loading...</p></div>
                ) : (
                    "Carousel"
                )}
            </section>
        </>
    );


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
                            placeholder="Search for startups and press Enter..."
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

                {searchQuery ? renderSearchResults() : renderDefaultView()}
            </main>
        </div>
    );
}
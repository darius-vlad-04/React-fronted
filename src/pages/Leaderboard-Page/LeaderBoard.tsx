import { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar.tsx";
import styles from './Leaderboard.module.css';


import { useLeaderboardData } from '../../hooks/useLeaderboardData.ts';
import LeaderboardComponent from "../../components/LeaderboardComponent/LeaderboardComponent.tsx";

type LeaderboardType = 'creators' | 'raised' | 'donated' | 'supported';

const leaderboardTabs = [
    { key: 'creators', label: 'Top Creators', metricLabel: 'Startups Created' },
    { key: 'raised', label: 'Top Fundraisers', metricLabel: '$ Total Raised' },
    { key: 'donated', label: 'Top Donors', metricLabel: '$ Total Donated' },
    { key: 'supported', label: 'Top Supporters', metricLabel: 'Startups Supported' },
];

export default function LeaderboardPage() {
    const [activeTab, setActiveTab] = useState<LeaderboardType>('creators');

    const { users, isLoading } = useLeaderboardData(activeTab);

    const activeLeaderboard = leaderboardTabs.find(tab => tab.key === activeTab);

    return (
        <div className={styles.leaderboardPage}>
            <Navbar />
            <main className={styles.container}>
                <h1 className={styles.pageTitle}>Leaderboards</h1>

                <div className={styles.tabsContainer}>
                    {leaderboardTabs.map(tab => (
                        <button
                            key={tab.key}
                            className={`${styles.tabButton} ${activeTab === tab.key ? styles.active : ''}`}
                            onClick={() => setActiveTab(tab.key as LeaderboardType)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className={styles.leaderboardWrapper}>
                    {activeLeaderboard && (
                        <LeaderboardComponent
                            users={users}
                            isLoading={isLoading}
                            metricLabel={activeLeaderboard.metricLabel}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
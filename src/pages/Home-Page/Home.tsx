import Navbar from "../../components/Navbar/Navbar.tsx";
import styles from "./Home.module.css";
import StartupCarousel from "../../components/StartupCarousel/StartupCarousel.tsx";
import {FaRocket, FaSearch, FaHandHoldingUsd, FaChartLine} from 'react-icons/fa';
import {useShowcaseStartups} from "../../hooks/useShowcaseStartups.ts";
import DotGrid from "../../components/DotGrid/DotGrid.tsx";

export default function Home() {

    const {startups: newestStartups} = useShowcaseStartups("recent");

    return (
        <div className={styles.homePage}>
            <Navbar/>
            <main>

                <section className={styles.heroSection}>
                    <DotGrid
                        className={styles.dotGridBackground}
                        dotSize={4}
                        gap={30}
                        baseColor="#45a29e"
                        activeColor="#66fcf1"
                        proximity={120}
                        shockRadius={250}
                        shockStrength={5}
                        resistance={750}
                        returnDuration={1.5}
                    />
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Fuel the Next Generation of Innovation</h1>
                        <p className={styles.heroSubtitle}>
                            Discover, fund, and launch groundbreaking startups. Your contribution can shape the future.
                        </p>
                        <div className={styles.ctaButtons}>
                            <a href="/explore" className={styles.ctaPrimary}>Explore Startups</a>
                            <a href="/startup/create" className={styles.ctaSecondary}>Launch Your Idea</a>
                        </div>
                    </div>
                </section>


                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Simple Steps to Make an Impact</h2>
                    <div className={styles.stepsGrid}>
                        <div className={styles.stepCard}>
                            <FaRocket className={styles.stepIcon}/>
                            <h3>1. Launch Your Vision</h3>
                            <p>Creators submit their innovative startup ideas with clear goals and a compelling
                                story.</p>
                        </div>
                        <div className={styles.stepCard}>
                            <FaSearch className={styles.stepIcon}/>
                            <h3>2. Discover Innovation</h3>
                            <p>Backers browse and discover a curated selection of promising new ventures.</p>
                        </div>
                        <div className={styles.stepCard}>
                            <FaHandHoldingUsd className={styles.stepIcon}/>
                            <h3>3. Fund the Future</h3>
                            <p>Contribute to the startups you believe in and receive unique perks as a thank you.</p>
                        </div>
                        <div className={styles.stepCard}>
                            <FaChartLine className={styles.stepIcon}/>
                            <h3>4. Watch Them Grow</h3>
                            <p>Follow the progress of the startups you've supported as they hit milestones and grow.</p>
                        </div>
                    </div>
                </section>


                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Featured Startups</h2>
                    <div className={styles.carouselContainer}>
                        <StartupCarousel startups={newestStartups}/>
                    </div>
                </section>


                <section className={`${styles.section} ${styles.finalCtaSection}`}>
                    <h2 className={styles.sectionTitle}>Ready to Change the World?</h2>
                    <p className={styles.finalCtaSubtitle}>Join a community of innovators and backers building the
                        future, one startup at a time.</p>
                    <a href="/signup" className={styles.ctaPrimary}>Get Started Now</a>
                </section>
            </main>
        </div>
    );
}
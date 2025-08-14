import Navbar from "../../components/Navbar/Navbar.tsx";
import styles from "./ExploreStartups.module.css"

export default function ExploreStartups() {

    return (
        <div>
            <Navbar></Navbar>
            <div className={styles['explore-upper-row']}>
                <div className={styles['filter']}>
                    Filter
                </div>
                <div className={styles['search-bar]']}>
                    Search Bar
                </div>
            </div>

            <div className={styles['most-donated-to-section'
                ]}>
            </div>
        </div>
    )
}
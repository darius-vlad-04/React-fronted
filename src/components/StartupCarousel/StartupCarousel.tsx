import Slider from "react-slick";
import type {StartupInterface} from "../../models/startup-models/startupInterface.ts";
import styles from './StartupCarousel.module.css';
import StartupExploreCard from "../StartupExploreCard/StartupExploreCard.tsx";

interface StartupCarouselProps {
    startups: StartupInterface[] | undefined;
}

export default function StartupCarousel({startups}: StartupCarouselProps) {
    if (!startups || startups.length === 0) {
        return (
            <div className={styles['placeholder-container']}>
                <p>Loading Startups...</p>
            </div>
        );
    }


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className={styles['carousel-wrapper']}>
            <Slider {...settings}>
                {startups.map((startup) => (
                    <div key={startup.id} className={styles['slide-item']}>
                        <StartupExploreCard startup={startup}/>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
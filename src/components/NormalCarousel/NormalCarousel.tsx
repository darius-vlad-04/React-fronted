import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NormalCarousel.css";
import Slider from "react-slick";
import PresentationCard from "../PresentationCard/PresentationCard.tsx";

function CenterCarousel() {
    const settings = {
        className: "center", // Add a class for custom styling
        centerMode: true,    // Enable center mode
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: "0px", // Removes default padding, we'll control spacing manually
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <PresentationCard/>
                </div>
                <div>
                    <PresentationCard/>
                </div>
                <div>
                    <PresentationCard/>
                </div>
                <div>
                    <PresentationCard/>
                </div>
                <div>
                    <PresentationCard/>
                </div>
                <div>
                    <PresentationCard/>
                </div>
            </Slider>
        </div>
    );
}
export default CenterCarousel;

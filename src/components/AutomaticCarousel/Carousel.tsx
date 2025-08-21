import Slider from "react-slick";
import animatedPicture from "../../assets/signup-page-illustration.jpg";
import animatedPicture2 from "../../assets/carousel_img_2.jpg";
import animatedPicture3 from "../../assets/carousel_img_3.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        waitForAnimate: false,
    };

    return (
        <div className= "carousel-wrapper">
            <Slider {...settings}>
                <div>
                    <img className="signup-illustration" src={animatedPicture} alt="illustration"/>
                </div>
                <div>
                    <img className="signup-illustration" src={animatedPicture2} alt="illustration2"/>
                </div>
                <div>
                    <img className="signup-illustration" src={animatedPicture3} alt="illustration3"/>
                </div>
            </Slider>
        </div>

    );
}

export default Carousel;
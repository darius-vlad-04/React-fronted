
import "./CTA.css"
import CenterCarousel from "../NormalCarousel/NormalCarousel.tsx";
export default function CTA() {
    return (
        <div className="cta-wrapper">
            <h3>
                Time to grow your startup
            </h3>

            <h1>
                Meet successful founders who started on Boostr!
            </h1>
            <CenterCarousel></CenterCarousel>
        </div>
    )
}
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const MainHeading = ({ title }) => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <h2
        className="text-2xl"
        data-aos="fade-zoom-in"
        data-aos-delay="120"
        data-aos-easing="ease-in-back"
        data-aos-offset="0"
      >
        {title}
      </h2>
    </>
  );
};

export default MainHeading;

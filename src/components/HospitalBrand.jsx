
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

import "./HospitalBrands.css";

const hospitals = [
  {
    // name: "City International Hospital",
    name: "Vietnam",
    logo: "/hospital-logos/cih_header_logo_aaci.png",
  },
  {
    // name: "Academic Hospital",
    name: "Turkey",
    logo: "/hospital-logos/HOSPITAL_LOGO.png",
  },
  {
    // name: "Gleneagles Hospital",
    name: "Singapore",
    logo: "/hospital-logos/logo-geh.png",
  },
  {
    // name: "Gia An 115 Hospital",
    name: "Vietnam",
    logo: "/hospital-logos/logox2.png",
  },
  {
    // name: "Mount Elizabeth Hospital",
    name: "Singapore",
    logo: "/hospital-logos/mount-elizabeth.png",
  },
  {
    // name: "Singapore General Hospital",
    name: "Singapore",
    logo: "/hospital-logos/sgh.png",
  },
  {
    // name: "Acibadem Healthcare Group",
    name: "Turkey",
    logo: "/hospital-logos/white-logo.png",
  },
];

export default function HospitalBrands() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReduceMotion(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section
      className="hospital-brands-section"
      aria-label="Explore leading hospitals"
    >
      <div className="hospital-brands-container">

        <div className="hospital-brands-heading">
          <span>EXPLORE LEADING</span>
          <strong>HOSPITALS</strong>
        </div>

        <div className="hospital-brands-divider" />

        <div className="hospital-brands-slider">
          <Swiper
            key={String(reduceMotion)}
            modules={[Autoplay, FreeMode]}
            className="hospital-logo-swiper"
            slidesPerView="auto"
            spaceBetween={40}
            loop={true}
            loopAdditionalSlides={6}
            speed={5500}
            allowTouchMove={true}
            freeMode={{
              enabled: true,
              momentum: false,
            }}
            autoplay={
              reduceMotion
                ? false
                : {
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    reverseDirection: true,
                    waitForTransition: true,
                  }
            }
            breakpoints={{
              0: {
                spaceBetween: 20,
              },
              640: {
                spaceBetween: 30,
              },
              1024: {
                spaceBetween: 40,
              },
            }}
          >
            {hospitals.map((hospital) => (
              <SwiperSlide key={hospital.name}>
                <div className="hospital-logo-card">
                  <img
                    src={hospital.logo}
                    alt={hospital.name}
                    loading="lazy"
                  />
                  <span>{hospital.name}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}

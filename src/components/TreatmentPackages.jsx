import React from "react";
import { ArrowRight } from "lucide-react";
import "./TreatmentPackages.css";

const packages = [
  {
    id: 1,
    title: "Kidney Transplant",
    price: "USD 55,000",
    image: "/images/kidney.png",
    featured: true,
  },
  {
    id: 2,
    title: "Liver Transplant",
    price: "USD 125,000",
    image: "/images/liver.png",
    featured: false,
  },
  {
    id: 3,
    title: "Cardiac Surgery",
    price: "USD 20,000",
    image: "/images/heart.png",
    featured: false,
  },
];

export default function TreatmentPackages() {
  const scrollToForm = () => {
    const formSection =
      document.getElementById("enquiry-form");

    if (formSection) {
      formSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className="treatment-packages-section"
      id="treatment-packages"
    >
      <div className="treatment-packages-container">

        {/* TOP DECORATION */}

        <div className="package-wave package-wave-top" />

        {/* SECTION HEADING */}

        <div className="packages-heading">

          <span className="packages-eyebrow">
            TREATMENT OPTIONS
          </span>

          <h2>
            Our Key Treatment Packages
          </h2>

          <p>
            Explore treatment options at selected
            international hospitals with indicative
            starting estimates.
          </p>

        </div>

        {/* PACKAGE CARDS */}

        <div className="packages-grid">

          {packages.map((item) => (
            <article
              key={item.id}
              className={`package-card ${
                item.featured
                  ? "package-card-featured"
                  : ""
              }`}
            >

              {/* CARD TOP */}

              <div className="package-card-top">

                <div className="package-image-wrap">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="package-image"
                    loading="lazy"
                  />

                </div>

                <h3>
                  {item.title}
                </h3>

              </div>

              {/* PRICE */}

              <div className="package-price-box">

                <span className="starting-text">
                  Starting From
                </span>

                <strong>
                  {item.price}
                </strong>

                <span className="price-underline" />

              </div>

            </article>
          ))}

        </div>

        {/* IMPORTANT NOTE */}

        <p className="package-disclaimer">
          Treatment costs may vary depending on the
          hospital, patient's medical condition,
          required investigations, treatment plan and
          length of stay. Final estimates are provided
          by the treating hospital after medical review.
        </p>

        {/* CTA */}

        <div className="packages-cta-wrap">

          <button
            type="button"
            className="packages-cta"
            onClick={scrollToForm}
          >
            <span>
              Get a Personalized Treatment Plan
            </span>

            <ArrowRight
              size={24}
              strokeWidth={2.2}
            />
          </button>

        </div>

        <div className="package-wave package-wave-bottom" />

      </div>
    </section>
  );
}
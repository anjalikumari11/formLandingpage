
import React from "react";
import {
  ArrowUpRight,
  HeartPulse,
  Activity,
} from "lucide-react";
import "./CriticalSurgeries.css";

const surgeries = [
  {
    id: "kidney-transplant",
    name: "Kidney Transplant",
    description:
      "Advanced transplant programs with experienced teams, personalised care and specialist coordination.",
    image: "/images/kidney.png",
    theme: "kidney",
  },
  {
    id: "liver-transplant",
    name: "Liver Transplant",
    description:
      "Explore liver transplant evaluation, specialist consultation, surgery planning and ongoing care.",
    image: "/images/liver.png",
    theme: "liver",
  },
  {
    id: "cardiac-surgery",
    name: "Cardiac Surgery",
    description:
      "Explore care for complex heart conditions, including bypass, valve repair and other cardiac procedures.",
    image: "/images/heart.png",
    theme: "cardiac",
  },
];

export default function CriticalSurgeries({
  onTreatmentSelect,
}) {
  const handleTreatmentClick = (surgery) => {
    // Optional callback for preselecting the enquiry form treatment
    if (onTreatmentSelect) {
      onTreatmentSelect(surgery.id);
    }

    const form = document.getElementById("enquiry-form");

    if (form) {
      form.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className="critical-surgeries-section"
      id="treatments"
      aria-labelledby="critical-surgeries-heading"
    >
      <div className="critical-surgeries-container">

        {/* Section Heading */}
        <div className="critical-surgeries-header">
          <div className="critical-surgeries-eyebrow">
            <span className="eyebrow-line" />
            OUR SPECIALISED CARE
          </div>

          <h2 id="critical-surgeries-heading">
            Critical Surgeries We Support
          </h2>

          <p>
            End-to-end coordination for complex,
            life-saving surgeries at trusted hospitals.
          </p>
        </div>

        {/* Surgery Cards */}
        <div className="critical-surgeries-grid">
          {surgeries.map((surgery, index) => (
            <article
              key={surgery.id}
              className={`critical-surgery-card ${surgery.theme}`}
              style={{
                "--card-index": index,
              }}
              id={surgery.id}
            >
              {/* Illustration */}
              <div className="surgery-illustration">
                <img
                  src={surgery.image}
                  alt=""
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="critical-surgery-content">
                <h3>{surgery.name}</h3>
                <p>{surgery.description}</p>
              </div>

              {/* Action */}
              <button
                type="button"
                className="surgery-card-arrow"
                aria-label={`Enquire about ${surgery.name}`}
                onClick={() => handleTreatmentClick(surgery)}
              >
                <ArrowUpRight size={18} strokeWidth={2} />
              </button>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

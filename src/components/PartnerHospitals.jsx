
import React from "react";
import "./PartnerHospitals.css";

const hospitals = [
  {
    name: "Combodia",
    logo: "/countries/combodia.jpg",
  },
  {
    name: "Georgia",
    logo: "/countries/Georgia.jpg",
  },
  {
    name: "Iran",
    logo: "/countries/iran.jpg",
  },
  {
    name: "Nigeria",
    logo: "/countries/Nigeria.jpg",
  },
  {
    name: "Singapore",
    logo: "/countries/singapore.jpg",
  },
  {
    name: "Turkey",
    logo: "/countries/turkey.jpg",
  },
];

export default function PartnerHospitals() {
  return (
    <section
      className="partner-hospitals-section"
      id="partner-hospitals"
      aria-labelledby="partner-hospitals-title"
    >
      <div className="partner-hospitals-container">
        {/* Heading */}
        <div className="partner-hospitals-heading">
          <div className="partner-hospitals-eyebrow">
            <span className="partner-hospitals-line" />
            COUNTRIES
          </div>

          <h2 id="partner-hospitals-title">
            Our Partner Hospitals Countries
          </h2>

          <p>
            Explore leading, internationally recognised
            hospitals known for their clinical expertise
            and patient care.
          </p>
        </div>

        {/* Hospital Logos */}
        <div className="partner-hospitals-grid">
          {hospitals.map((hospital, index) => (
            <div
              className="partner-hospital-item"
              key={hospital.name}
              style={{
                "--hospital-index": index,
              }}
            >
              <img
                src={hospital.logo}
                alt={hospital.name}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

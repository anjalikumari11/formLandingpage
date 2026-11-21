import React from "react";

import {
  ClipboardList,
  HeartHandshake,
  Hospital,
  Coins,
  Plane,
  Stethoscope,
} from "lucide-react";

import "./WhyChooseUs.css";

const benefits = [
  {
    icon: ClipboardList,
    title: "Medical Case Review",
    description:
      "Help organise medical records for assessment by qualified transplant specialists.",
  },
  {
    icon: HeartHandshake,
    title: "Donor Compatibility Guidance",
    description:
      "Understand the medical and legal evaluation process, including alternatives where permitted.",
  },
  {
    icon: Hospital,
    title: "Hospital Coordination",
    description:
      "Facilitate consultations and communication with transplant hospitals and specialist teams.",
  },
  {
    icon: Coins,
    title: "Treatment Cost Guidance",
    description:
      "Help obtain hospital estimates and understand potential additional treatment-related expenses.",
  },
  {
    icon: Plane,
    title: "Travel & Stay Assistance",
    description:
      "Support with treatment-related travel, accommodation planning and hospital visit coordination.",
  },
  {
    icon: Stethoscope,
    title: "Post-Treatment Coordination",
    description:
      "Help arrange follow-up communication and continuity-of-care planning after treatment.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="why-care-section"
      id="why-choose-us"
      aria-labelledby="why-care-heading"
    >
      <div className="why-care-container">

        {/* =========================
            LEFT IMAGE
        ========================== */}

        <div className="why-care-image-column">
          <div className="why-care-image-wrapper">

            <img
              src="/patient-care.png"
              alt="Patient receiving healthcare coordination support"
              loading="lazy"
            />

          </div>
        </div>

        {/* =========================
            RIGHT CONTENT
        ========================== */}

        <div className="why-care-content">

          {/* EYEBROW */}

          <div className="why-care-eyebrow">
            <span />
            RESPONSIBLE CARE COORDINATION
          </div>

          {/* MAIN HEADING */}

          <h2 id="why-care-heading">
            Your Health Deserves Careful Decisions,
            <br />
            Not Empty Promises.
          </h2>

          {/* INTRODUCTION */}

          <p className="why-care-intro">
            We believe every patient deserves transparent
            information, responsible medical coordination
            and a clear understanding of their treatment
            options.
          </p>

          {/* SUPPORT HEADING */}

          <h3 className="why-care-support-heading">
            How We Support Your Journey
          </h3>

          {/* =========================
              BENEFIT CARDS
          ========================== */}

          <div className="why-care-benefits">

            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <article
                  className="why-care-benefit"
                  key={benefit.title}
                  style={{
                    "--delay": `${index * 80}ms`,
                  }}
                >

                  <div className="why-care-benefit-icon">

                    <Icon
                      size={30}
                      strokeWidth={1.8}
                    />

                  </div>

                  <h3>
                    {benefit.title}
                  </h3>

                  <p>
                    {benefit.description}
                  </p>

                </article>
              );
            })}

          </div>

          {/* =========================
              IMPORTANT DISCLAIMER
          ========================== */}

          <div className="why-care-disclaimer">

            <strong>
              Important:
            </strong>

            <p>
              Transplant eligibility, donor approval and
              treatment decisions remain with authorized
              medical teams and relevant authorities.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

import React from "react";
import {
  ClipboardList,
  SearchCheck,
  Hospital,
  Plane,
  ArrowRight,
  ChevronRight,
  Quote,
} from "lucide-react";

import "./PatientJourney.css";

const journeySteps = [
  {
    number: "01",
    title: "Submit Case",
    description:
      "Share your details and treatment requirements.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Medical Review",
    description:
      "Coordinate review of your case with the relevant medical team.",
    icon: SearchCheck,
  },
  {
    number: "03",
    title: "Hospital Match",
    description:
      "Explore suitable specialists and hospital options.",
    icon: Hospital,
  },
  {
    number: "04",
    title: "Travel & Admission",
    description:
      "Get guidance for travel, admission and coordination.",
    icon: Plane,
  },
];

export default function PatientJourney({
  testimonials = [],
}) {
  const hasTestimonials = testimonials.length > 0;

  return (
    <section
      id="patient-journey"
      className="pj-section"
      aria-labelledby="pj-title"
    >
      <div className="pj-container">

        {/* ==========================
            JOURNEY HEADING
        ========================== */}

        <div className="pj-section-heading">
          <div className="pj-eyebrow">
            <span className="pj-eyebrow-line" />
            YOUR TREATMENT JOURNEY
          </div>

          <h2 id="pj-title">
            A Simple, Guided Process
          </h2>

          <p>
            From enquiry to hospital admission, we
            support you at every step.
          </p>
        </div>

        {/* ==========================
            PROCESS STEPS
        ========================== */}

        <div className="pj-steps">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <React.Fragment key={step.number}>
                <div
                  className="pj-step"
                  style={{
                    "--step-delay": `${index * 120}ms`,
                  }}
                >
                  <div className="pj-step-icon">
                    <Icon
                      size={29}
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3>
                    {index + 1}. {step.title}
                  </h3>

                  <p>{step.description}</p>
                </div>

                {index < journeySteps.length - 1 && (
                  <div
                    className="pj-step-arrow"
                    aria-hidden="true"
                  >
                    <ChevronRight size={24} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ==========================
            CTA BANNER
        ========================== */}

        <div className="pj-cta-banner">
          <div className="pj-cta-image">
            <img
              src="/images/china.webp"
              alt="Modern hospital building"
              loading="lazy"
            />
          </div>

          <div className="pj-cta-content">
            <h2>
              Ready to Explore Your
              Treatment Options?
            </h2>

            <p>
              Connect with our coordination team to
              discuss hospital options and the next
              steps for your treatment.
            </p>

            <a
              href="#enquiry-form"
              className="pj-cta-button"
            >
              Request Treatment Guidance
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

        {/* ==========================
            PATIENT EXPERIENCES
        ========================== */}

        {hasTestimonials && (
          <div
            className="pj-testimonials-section"
            aria-labelledby="pj-testimonials-title"
          >
            <div className="pj-section-heading pj-testimonials-heading">
              <div className="pj-eyebrow">
                <span className="pj-eyebrow-line" />
                PATIENT EXPERIENCES
              </div>

              <h2 id="pj-testimonials-title">
                Trusted by Patients Worldwide
              </h2>

              <p>
                Experiences shared by patients who
                received healthcare coordination support.
              </p>
            </div>

            <div className="pj-testimonials-grid">
              {testimonials.map((review, index) => (
                <article
                  className="pj-testimonial-card"
                  key={review.id}
                  style={{
                    "--review-delay": `${index * 100}ms`,
                  }}
                >
                  <Quote
                    className="pj-quote-icon"
                    size={27}
                    fill="currentColor"
                    strokeWidth={0}
                  />

                  <p className="pj-testimonial-text">
                    {review.review}
                  </p>

                  <div className="pj-patient-info">
                    {review.image ? (
                      <img
                        src={review.image}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="pj-patient-avatar"
                        aria-hidden="true"
                      >
                        {review.name?.charAt(0) || "P"}
                      </div>
                    )}

                    <div className="pj-patient-details">
                      <strong>{review.name}</strong>

                      <span>
                        {review.flag && (
                          <span aria-hidden="true">
                            {review.flag}{" "}
                          </span>
                        )}
                        {review.country}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

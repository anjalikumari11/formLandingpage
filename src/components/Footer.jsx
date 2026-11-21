
import React from "react";
import { Phone, ArrowUpRight } from "lucide-react";
import "./Footer.css";

const treatments = [
  {
    name: "Kidney Transplant",
    href: "#kidney-transplant",
  },
  {
    name: "Liver Transplant",
    href: "#liver-transplant",
  },
  {
    name: "Cardiac Surgery",
    href: "#cardiac-surgery",
  },
];

const footerLinks = [
  { name: "Treatments", href: "#treatments" },
  { name: "Hospitals", href: "#hospitals" },
  { name: "Patient Journey", href: "#patient-journey" },
  { name: "Why Choose Us", href: "#why-choose-us" },
];

export default function Footer() {
  return (
    <footer className="medical-footer">
      <div className="medical-footer-container">

        {/* LEFT: THREE TREATMENTS */}
        <div className="medical-footer-treatments">
          {treatments.map((treatment, index) => (
            <React.Fragment key={treatment.name}>
              {index > 0 && (
                <span
                  className="medical-footer-separator"
                  aria-hidden="true"
                >
                  |
                </span>
              )}

              <a href={treatment.href}>
                {treatment.name}
              </a>
            </React.Fragment>
          ))}
        </div>

        {/* CENTER: NAVIGATION */}
        <nav
          className="medical-footer-navigation"
          aria-label="Footer navigation"
        >
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              {index > 0 && (
                <span
                  className="medical-footer-separator"
                  aria-hidden="true"
                >
                  |
                </span>
              )}

              <a href={link.href}>
                {link.name}
              </a>
            </React.Fragment>
          ))}
        </nav>

        {/* RIGHT: CONTACT BUTTON */}
        <a
          href="#enquiry-form"
          className="medical-footer-contact"
        >
          <Phone size={15} />
          <span>Get in Touch</span>
          <ArrowUpRight size={14} />
        </a>

      </div>
    </footer>
  );
}

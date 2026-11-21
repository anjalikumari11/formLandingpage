
import React, { useState, useEffect, useRef } from "react";
import {
    ChevronDown,
    Menu,
    X,
    ArrowUpRight,
} from "lucide-react";

import "./Navbar.css";

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

const navLinks = [
  
    {
        name: "Patient Journey",
        href: "#patient-journey",
    },
    {
        name: "Why Choose Us",
        href: "#why-choose-us",
    },
   
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeTreatment, setActiveTreatment] = useState(0);
    const [reduceMotion, setReduceMotion] = useState(false);

    const dropdownRef = useRef(null);

    // Respect reduced motion settings
    useEffect(() => {
        const media = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const update = () => setReduceMotion(media.matches);
        update();

        media.addEventListener("change", update);

        return () => media.removeEventListener("change", update);
    }, []);

    // Automatically rotate treatment names
    useEffect(() => {
        if (reduceMotion) return;

        const interval = window.setInterval(() => {
            setActiveTreatment((previous) =>
                (previous + 1) % treatments.length
            );
        }, 3000);

        return () => window.clearInterval(interval);
    }, [reduceMotion]);

    // Navbar shadow on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 15);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setDropdownOpen(false);
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener(
                "pointerdown",
                handleClickOutside
            );
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const closeMenu = () => {
        setMenuOpen(false);
        setDropdownOpen(false);
    };

    return (
        <header
            className={`site-header ${scrolled ? "is-scrolled" : ""}`}
        >
            <div className="navbar-container">

                {/* Animated Treatment Title */}
                {/* All Three Treatments in One Row */}
                <div className="navbar-treatment-row">
                    {treatments.map((treatment, index) => (
                        <React.Fragment key={treatment.name}>
                            {index > 0 && (
                                <span className="navbar-treatment-separator">
                                    |
                                </span>
                            )}

                            <a
                                href={treatment.href}
                                className="navbar-treatment-name"
                                onClick={closeMenu}
                            >
                                {treatment.name}
                            </a>
                        </React.Fragment>
                    ))}
                </div>

                {/* Navigation */}
                <nav
                    id="primary-navigation"
                    className={`navbar-links ${menuOpen ? "open" : ""}`}
                    aria-label="Main navigation"
                >
                    {/* Treatments Dropdown */}
                    <div
                        className="navbar-dropdown"
                        ref={dropdownRef}
                    >
                        <button
                            type="button"
                            className={`navbar-link dropdown-toggle ${dropdownOpen ? "selected" : ""
                                }`}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            aria-expanded={dropdownOpen}
                            aria-controls="treatment-dropdown"
                        >
                            Treatments

                            <ChevronDown
                                size={15}
                                className={dropdownOpen ? "rotate" : ""}
                            />
                        </button>

                        {dropdownOpen && (
                            <div
                                id="treatment-dropdown"
                                className="treatment-dropdown-menu"
                            >
                                {treatments.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={closeMenu}
                                    >
                                        {item.name}
                                        <ArrowUpRight size={15} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Other Links */}
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="navbar-link"
                            onClick={closeMenu}
                        >
                            {link.name}
                        </a>
                    ))}

                    {/* Mobile CTA */}
                    <a
                        href="#enquiry-form"
                        className="navbar-mobile-cta"
                        onClick={closeMenu}
                    >
                        Get Free Consultation
                        <ArrowUpRight size={17} />
                    </a>
                </nav>

                {/* Desktop CTA */}
                <a
                    className="navbar-cta"
                    href="#enquiry-form"
                >
                    Get Free Consultation
                    <ArrowUpRight size={17} />
                </a>

                {/* Mobile Toggle */}
                <button
                    type="button"
                    className="navbar-hamburger"
                    onClick={() => {
                        setMenuOpen(!menuOpen);
                        setDropdownOpen(false);
                    }}
                    aria-label={
                        menuOpen ? "Close menu" : "Open menu"
                    }
                    aria-expanded={menuOpen}
                    aria-controls="primary-navigation"
                >
                    {menuOpen ? (
                        <X size={25} />
                    ) : (
                        <Menu size={25} />
                    )}
                </button>

            </div>
        </header>
    );
}

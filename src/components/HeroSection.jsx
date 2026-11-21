import React, { useRef, useState } from "react";

import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  UploadCloud,
  X,
  HeartHandshake,
  Building2,
  Plane,
} from "lucide-react";

import "./HeroSection.css";

/* ===================================
   FORM OPTIONS
=================================== */

const treatments = [
  {
    value: "kidney-transplant",
    label: "Kidney Transplant",
  },
  {
    value: "liver-transplant",
    label: "Liver Transplant",
  },
  {
    value: "cardiac-surgery",
    label: "Cardiac Surgery",
  },
  {
    value: "other",
    label: "Other / Not Sure",
  },
];

const destinations = [
  "Not decided",
  "Türkiye",
  "Iran",
  "Georgia",
  "Vietnam",
  "China",
  "Cambodia",
  "Nigeria",
  "Singapore",
];

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "Unknown",
];

const sexOptions = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

const donorOptions = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

const dialysisOptions = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

/* ===================================
   INITIAL FORM
=================================== */

const initialForm = {
  fullName: "",
  country: "",
  phone: "",
  email: "",
  age: "",
  sex: "",
  bloodGroup: "",
  treatment: "",
  destination: "",
  donorAvailability: "",
  dialysis: "",
  currentCondition: "",
  consent: false,
};

/* ===================================
   HERO SUPPORT FEATURES
=================================== */

const features = [
  {
    icon: HeartHandshake,

    title: "Medical Record & Evaluation Coordination",

    description:
      "Get help organising medical information for review and understanding the hospital-led kidney transplant evaluation process.",
  },

  {
    icon: Building2,

    title: "Hospital & Donor Evaluation Guidance",

    description:
      "Explore suitable hospitals and understand donor evaluation and compatibility requirements determined by the treating medical team.",
  },

  {
    icon: Plane,

    title: "International Patient & Travel Support",

    description:
      "Receive assistance with appointments, hospital communication, treatment planning and international travel coordination.",
  },
];

/* ===================================
   FILE SETTINGS
=================================== */

const MAX_FILES = 3;

const MAX_SIZE = 5 * 1024 * 1024;

const validFileTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

/* ===================================
   REUSABLE RADIO COMPONENT
=================================== */

function RadioField({
  legend,
  name,
  options,
  value,
  onChange,
}) {
  return (
    <fieldset className="surgery-radio-group">
      <legend>
        {legend}
        <span className="required-star"> *</span>
      </legend>

      <div className="surgery-radio-options">
        {options.map((option) => (
          <label
            className={`surgery-radio-option ${
              value === option.value ? "active" : ""
            }`}
            key={option.value}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              required
            />

            <span>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* ===================================
   MAIN HERO COMPONENT
=================================== */

export default function HeroSection() {
  const [form, setForm] = useState(initialForm);

  const [medicalReports, setMedicalReports] =
    useState([]);

  const [submitting, setSubmitting] =
    useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const fileInputRef = useRef(null);

  /* ===================================
     INPUT CHANGES
  =================================== */

  const updateField = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  /* ===================================
     FILE UPLOAD
  =================================== */

  const handleFileChange = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (files.length > MAX_FILES) {
      event.target.value = "";

      setMedicalReports([]);

      setStatus({
        type: "error",
        message:
          "Maximum 3 medical reports are allowed.",
      });

      return;
    }

    const invalid =
      files.some(
        (file) =>
          !validFileTypes.includes(
            file.type
          ) ||
          file.size > MAX_SIZE
      );

    if (invalid) {
      event.target.value = "";

      setMedicalReports([]);

      setStatus({
        type: "error",

        message:
          "Only PDF, JPG, PNG and WebP files up to 5 MB each are allowed.",
      });

      return;
    }

    setMedicalReports(files);

    setStatus({
      type: "",
      message: "",
    });
  };

  const removeReport = (
    indexToRemove
  ) => {
    const remaining =
      medicalReports.filter(
        (_, index) =>
          index !== indexToRemove
      );

    setMedicalReports(remaining);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* ===================================
     FILE → BASE64
  =================================== */

  const fileToBase64 = (file) => {
    return new Promise(
      (resolve, reject) => {
        const reader =
          new FileReader();

        reader.onload = () => {
          try {
            const result =
              reader.result;

            if (
              typeof result !==
              "string"
            ) {
              reject(
                new Error(
                  `Unable to process file: ${file.name}`
                )
              );

              return;
            }

            const base64Data =
              result.includes(",")
                ? result.split(",")[1]
                : result;

            resolve({
              name: file.name,

              mimeType:
                file.type ||
                "application/octet-stream",

              data: base64Data,
            });

          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = () => {
          reject(
            new Error(
              `Unable to read file: ${file.name}`
            )
          );
        };

        reader.readAsDataURL(
          file
        );
      }
    );
  };

  /* ===================================
     FORM SUBMISSION
  =================================== */

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      if (submitting) return;

      /* ===============================
         REQUIRED FIELD VALIDATION
      =============================== */

      const requiredFields = [
        "fullName",
        "country",
        "phone",
        "email",
        "age",
        "sex",
        "bloodGroup",
        "treatment",
        "destination",
        "donorAvailability",
        "dialysis",
        "currentCondition",
      ];

      const missingRequiredField =
        requiredFields.some(
          (field) =>
            !String(
              form[field] ?? ""
            ).trim()
        );

      if (
        missingRequiredField
      ) {
        setStatus({
          type: "error",

          message:
            "Please complete all mandatory fields.",
        });

        return;
      }

      /* ===============================
         AGE VALIDATION
      =============================== */

      const age =
        Number(form.age);

      if (
        !Number.isInteger(age) ||
        age < 0 ||
        age > 120
      ) {
        setStatus({
          type: "error",

          message:
            "Please enter a valid patient age.",
        });

        return;
      }

      /* ===============================
         CONSENT VALIDATION
      =============================== */

      if (!form.consent) {
        setStatus({
          type: "error",

          message:
            "Please accept the consent statement.",
        });

        return;
      }

      /* ===============================
         GOOGLE SCRIPT URL
      =============================== */

      const scriptUrl =
        import.meta.env
          .VITE_GOOGLE_SCRIPT_URL;

      if (!scriptUrl) {
        console.error(
          "VITE_GOOGLE_SCRIPT_URL is missing."
        );

        setStatus({
          type: "error",

          message:
            "Form submission is not configured. Please contact our support team.",
        });

        return;
      }

      setSubmitting(true);

      setStatus({
        type: "",
        message: "",
      });

      try {
        /* ===============================
           CONVERT REPORTS
        =============================== */

        const convertedReports =
          await Promise.all(
            medicalReports.map(
              (file) =>
                fileToBase64(file)
            )
          );

        /* ===============================
           APPS SCRIPT PAYLOAD
        =============================== */

        const payload = {
          fullName:
            form.fullName.trim(),

          country:
            form.country.trim(),

          mobile:
            form.phone.trim(),

          email:
            form.email.trim(),

          age:
            String(age),

          sex:
            form.sex,

          bloodGroup:
            form.bloodGroup,

          treatment:
            form.treatment,

          preferredDestination:
            form.destination,

          donorAvailability:
            form.donorAvailability,

          dialysisSessions:
            form.dialysis,

          currentCondition:
            form.currentCondition.trim(),

          reports:
            convertedReports,
        };

        console.log(
          "Submitting patient enquiry:",
          {
            ...payload,

            reports:
              convertedReports.map(
                (report) => ({
                  name:
                    report.name,

                  mimeType:
                    report.mimeType,
                })
              ),
          }
        );

        /* ===============================
           SEND TO APPS SCRIPT
        =============================== */

        await fetch(
          scriptUrl,
          {
            method: "POST",

            mode: "no-cors",

            headers: {
              "Content-Type":
                "text/plain;charset=utf-8",
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );

        /* ===============================
           SUCCESS
        =============================== */

        setStatus({
          type: "success",

          message:
            "Your kidney transplant enquiry has been submitted successfully. Our coordination team can review the information and guide you on the next steps.",
        });

        /* ===============================
           RESET FORM
        =============================== */

        setForm({
          ...initialForm,
        });

        setMedicalReports([]);

        if (
          fileInputRef.current
        ) {
          fileInputRef.current.value =
            "";
        }

      } catch (error) {
        console.error(
          "Patient enquiry submission failed:",
          error
        );

        setStatus({
          type: "error",

          message:
            "Unable to submit your enquiry. Please check your connection and try again.",
        });

      } finally {
        setSubmitting(false);
      }
    };

  /* ===================================
     JSX
  =================================== */

  return (
    <section
      className="surgery-hero"
      id="home"
    >
      <div className="surgery-hero-container">

        {/* ==============================
            LEFT HERO SECTION
        ============================== */}

        <div className="surgery-hero-left">

          <div className="surgery-hero-content">

            {/* EYEBROW */}

            <div className="surgery-hero-eyebrow">
              KIDNEY TRANSPLANT COORDINATION
            </div>

            {/* MAIN HEADING */}

            <h1 className="surgery-hero-title">
              Kidney Transplant

              <span>
                Coordination &amp;
                International Patient Support
              </span>
            </h1>

            <div className="surgery-title-line" />

            {/* HERO DESCRIPTION */}

            <p className="surgery-hero-description">
              Navigating a kidney transplant can involve
              many important medical and practical
              decisions. Get support with hospital
              coordination, specialist consultations,
              donor evaluation guidance, treatment
              planning and international patient
              assistance.
            </p>

            {/* ADDITIONAL INFORMATION */}

            <div className="surgery-hero-extra">

              <h2>
                Clear Guidance Through Every Step
                of Kidney Transplant Planning
              </h2>

              <p>
                Every patient's situation is different.
                Our coordination team helps patients and
                families organise medical information,
                explore suitable hospitals, understand
                the evaluation process and communicate
                with healthcare providers so they can
                make informed decisions about the next
                steps.
              </p>

              {/* FEATURES */}

              <div className="surgery-hero-highlights">

                {features.map(
                  (feature) => {
                    const Icon =
                      feature.icon;

                    return (
                      <div
                        className="surgery-hero-highlight"
                        key={
                          feature.title
                        }
                      >

                        <div className="surgery-highlight-icon">

                          <Icon
                            size={20}
                            strokeWidth={
                              1.9
                            }
                          />

                        </div>

                        <div className="surgery-highlight-content">

                          <strong>
                            {
                              feature.title
                            }
                          </strong>

                          <span>
                            {
                              feature.description
                            }
                          </span>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

              {/* TRUST NOTE */}

              <p className="surgery-hero-description">
                Medical eligibility, donor compatibility
                and transplant decisions are assessed by
                the treating hospital and qualified
                medical professionals.
              </p>

            </div>

          </div>

          {/* DOCTOR IMAGE */}

          <div className="surgery-doctors-visual">

            <div className="surgery-doctor-glow" />

            <img
              src="/doctors/team-image.png"
              alt="Healthcare professionals supporting international patients"
              className="surgery-doctors-image"
              fetchPriority="high"
            />

          </div>

        </div>

        {/* ==============================
            RIGHT FORM SECTION
        ============================== */}

        <div
          className="surgery-hero-right"
          id="enquiry-form"
        >

          <div className="surgery-form-card">

            {/* FORM EYEBROW */}

            <div className="surgery-form-eyebrow">

              <span className="surgery-eyebrow-line" />

              KIDNEY TRANSPLANT ENQUIRY

            </div>

            {/* FORM HEADING */}

            <h2 className="surgery-form-heading">

              Request Kidney Transplant

              <span>
                {" "}
                Guidance
              </span>

            </h2>

            {/* FORM DESCRIPTION */}

            <p className="surgery-form-description">
              Share the patient's basic information and
              current medical condition. Our coordination
              team can review your enquiry and help explain
              the appropriate next steps for hospital and
              specialist coordination.
            </p>

            <form
              className="surgery-enquiry-form"
              onSubmit={
                handleSubmit
              }
            >

              <div className="surgery-form-grid">

                {/* FULL NAME */}

                <div className="surgery-form-group">

                  <label htmlFor="surgery-full-name">

                    Patient Full Name
                    {" "}
                    <span>*</span>

                  </label>

                  <input
                    id="surgery-full-name"
                    type="text"
                    name="fullName"
                    placeholder="Enter Patient Full Name"
                    value={
                      form.fullName
                    }
                    onChange={
                      updateField
                    }
                    maxLength={
                      100
                    }
                    autoComplete="name"
                    required
                  />

                </div>

                {/* COUNTRY */}

                <div className="surgery-form-group">

                  <label htmlFor="surgery-country">

                    Country
                    {" "}
                    <span>*</span>

                  </label>

                  <input
                    id="surgery-country"
                    type="text"
                    name="country"
                    placeholder="Patient's Country"
                    value={
                      form.country
                    }
                    onChange={
                      updateField
                    }
                    maxLength={
                      80
                    }
                    autoComplete="country-name"
                    required
                  />

                </div>

                {/* PHONE */}

                <div className="surgery-form-group">

                  <label htmlFor="surgery-phone">

                    Mobile / WhatsApp
                    {" "}
                    <span>*</span>

                  </label>

                  <input
                    id="surgery-phone"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number with Country Code"
                    value={
                      form.phone
                    }
                    onChange={
                      updateField
                    }
                    pattern="[+0-9().\s-]{7,25}"
                    title="Enter a valid phone number with country code"
                    autoComplete="tel"
                    required
                  />

                </div>

                {/* EMAIL */}

                <div className="surgery-form-group">

                  <label htmlFor="surgery-email">

                    Email Address
                    {" "}
                    <span>*</span>

                  </label>

                  <input
                    id="surgery-email"
                    type="email"
                    name="email"
                    placeholder="Patient or Family Email Address"
                    value={
                      form.email
                    }
                    onChange={
                      updateField
                    }
                    autoComplete="email"
                    maxLength={
                      254
                    }
                    required
                  />

                </div>

                {/* AGE */}

                <div className="surgery-form-group">

                  <label htmlFor="surgery-age">

                    Patient Age
                    {" "}
                    <span>*</span>

                  </label>

                  <input
                    id="surgery-age"
                    type="number"
                    name="age"
                    min="0"
                    max="120"
                    step="1"
                    placeholder="Age in Years"
                    value={
                      form.age
                    }
                    onChange={
                      updateField
                    }
                    required
                  />

                </div>

                {/* SEX */}

                <RadioField
                  legend="Sex"
                  name="sex"
                  options={
                    sexOptions
                  }
                  value={
                    form.sex
                  }
                  onChange={
                    updateField
                  }
                />

                {/* BLOOD GROUP */}

                <div className="surgery-form-group">

                  <label htmlFor="surgery-blood-group">

                    Blood Group
                    {" "}
                    <span>*</span>

                  </label>

                  <select
                    id="surgery-blood-group"
                    name="bloodGroup"
                    value={
                      form.bloodGroup
                    }
                    onChange={
                      updateField
                    }
                    required
                  >

                    <option value="">
                      Select Blood Group
                    </option>

                    {bloodGroups.map(
                      (group) => (
                        <option
                          key={
                            group
                          }
                          value={
                            group
                          }
                        >
                          {
                            group
                          }
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* REQUIRED TREATMENT */}

                <div className="surgery-form-group">

                  <label htmlFor="surgery-treatment">

                    Treatment Required
                    {" "}
                    <span>*</span>

                  </label>

                  <select
                    id="surgery-treatment"
                    name="treatment"
                    value={
                      form.treatment
                    }
                    onChange={
                      updateField
                    }
                    required
                  >

                    <option value="">
                      Select Treatment
                    </option>

                    {treatments.map(
                      (item) => (
                        <option
                          key={
                            item.value
                          }
                          value={
                            item.value
                          }
                        >
                          {
                            item.label
                          }
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* DESTINATION */}

                <div className="surgery-form-group">

                  <label htmlFor="surgery-destination">

                    Preferred Treatment Destination
                    {" "}
                    <span>*</span>

                  </label>

                  <select
                    id="surgery-destination"
                    name="destination"
                    value={
                      form.destination
                    }
                    onChange={
                      updateField
                    }
                    required
                  >

                    <option value="">
                      Select Destination
                    </option>

                    {destinations.map(
                      (
                        destination
                      ) => (
                        <option
                          key={
                            destination
                          }
                          value={
                            destination
                          }
                        >
                          {
                            destination
                          }
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* DONOR + DIALYSIS */}

                <div className="surgery-medical-choice-row">

                  <RadioField
                    legend="Is a Potential Donor Available?"
                    name="donorAvailability"
                    options={
                      donorOptions
                    }
                    value={
                      form.donorAvailability
                    }
                    onChange={
                      updateField
                    }
                  />

                  <RadioField
                    legend="Is the Patient Currently on Dialysis?"
                    name="dialysis"
                    options={
                      dialysisOptions
                    }
                    value={
                      form.dialysis
                    }
                    onChange={
                      updateField
                    }
                  />

                </div>

                {/* CURRENT CONDITION */}

                <div className="surgery-form-group surgery-full-width">

                  <label htmlFor="surgery-condition">

                    Current Medical Condition
                    {" "}
                    <span>*</span>

                  </label>

                  <textarea
                    id="surgery-condition"
                    name="currentCondition"
                    rows={4}
                    placeholder="Briefly describe the patient's kidney condition, diagnosis, dialysis status, previous treatment or any information you would like our coordination team to know."
                    value={
                      form.currentCondition
                    }
                    onChange={
                      updateField
                    }
                    maxLength={
                      2000
                    }
                    required
                  />

                </div>

                {/* MEDICAL REPORTS */}

                <div className="surgery-form-group surgery-full-width">

                  <label htmlFor="medical-reports">

                    Have Medical Reports?
                    Upload Them Here
                    (Optional)

                  </label>

                  <div className="medical-report-upload">

                    <UploadCloud
                      size={
                        22
                      }
                    />

                    <input
                      ref={
                        fileInputRef
                      }
                      id="medical-reports"
                      type="file"
                      name="medicalReports"
                      accept=".pdf,.jpg,.jpeg,.png,.webp"
                      multiple
                      onChange={
                        handleFileChange
                      }
                    />

                    <small>
                      Upload available
                      medical reports,
                      test results or
                      scans. PDF, JPG,
                      PNG or WebP.
                      Maximum 3 files,
                      5 MB each.
                    </small>

                  </div>

                  {medicalReports.length >
                    0 && (

                    <div className="medical-report-file-names">

                      {medicalReports.map(
                        (
                          file,
                          index
                        ) => (

                          <div
                            className="medical-file-item"
                            key={`${file.name}-${index}`}
                          >

                            <FileText
                              size={
                                16
                              }
                            />

                            <span>
                              {
                                file.name
                              }
                            </span>

                            <button
                              type="button"
                              aria-label={`Remove ${file.name}`}
                              onClick={() =>
                                removeReport(
                                  index
                                )
                              }
                            >

                              <X
                                size={
                                  16
                                }
                              />

                            </button>

                          </div>

                        )
                      )}

                    </div>

                  )}

                </div>

              </div>

              {/* CONSENT */}

              <label className="surgery-consent">

                <input
                  type="checkbox"
                  name="consent"
                  checked={
                    form.consent
                  }
                  onChange={
                    updateField
                  }
                  required
                />

                <span>

                  I confirm that I am the patient or
                  authorised to submit this enquiry on
                  the patient's behalf. I consent to the
                  collection and use of the information
                  provided and any uploaded medical
                  reports for enquiry handling, hospital
                  communication and healthcare
                  coordination, as explained in the{" "}

                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>.

                </span>

              </label>

              {/* TRUST / ROLE NOTE */}

              <p className="surgery-form-description">
  We provide healthcare coordination support.
  Medical eligibility, donor compatibility and
  treatment decisions are assessed by qualified
  healthcare professionals at the treating hospital.
</p>

              {/* STATUS */}

              {status.message && (

                <div
                  className={`surgery-form-status ${status.type}`}
                  role={
                    status.type ===
                    "error"
                      ? "alert"
                      : "status"
                  }
                >

                  {status.type ===
                  "success" ? (

                    <CheckCircle2
                      size={
                        17
                      }
                    />

                  ) : (

                    <AlertCircle
                      size={
                        17
                      }
                    />

                  )}

                  <span>
                    {
                      status.message
                    }
                  </span>

                </div>

              )}

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                className="surgery-submit-btn"
                disabled={
                  submitting
                }
              >

                <span>

                  {submitting
                    ? "Submitting Enquiry..."
                    : "Request Kidney Transplant Guidance"}

                </span>

                {!submitting && (

                  <ArrowRight
                    size={
                      19
                    }
                  />

                )}

              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_API = `${import.meta.env.VITE_API_URL}/contacts`;

const emptyForm = { name: "", email: "", subject: "", message: "" };

const bureaus = [
  {
    city: "New York",
    address: "412 Press Avenue, Suite 900, New York, NY 10018",
    phone: "+1 (212) 555-0148",
  },
  {
    city: "London",
    address: "18 Fleet Court, London, EC4Y 1AA, United Kingdom",
    phone: "+44 20 7946 0958",
  },
  {
    city: "Mumbai",
    address: "3rd Floor, Sena Bhavan, Dadar West, Mumbai 400028",
    phone: "+91 22 4900 3311",
  },
];

const ContactPage = () => {
  const sectionRef = useRef(null);
  const heroTextRef = useRef(null);
  const formCardRef = useRef(null);
  const infoCardRef = useRef(null);
  const bureausRef = useRef(null);
  const bureauItemsRef = useRef([]);

  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroTextRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
      );

      gsap.fromTo(
        [formCardRef.current, infoCardRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: formCardRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        bureausRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: bureausRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        bureauItemsRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: bureausRef.current, start: "top 82%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Name, email, and message are required.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to send your message");
      }

      setSuccess("Message sent — our desk will get back to you shortly.");
      setForm(emptyForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <div className="ledger-contact-page" ref={sectionRef}>
        {/* HERO — inverted plate, matches About/News */}
        <div className="ledger-contact-hero">
          <div className="ledger-contact-hero-inner" ref={heroTextRef}>
            <span className="ledger-eyebrow ledger-eyebrow--inverse">
              <span className="ledger-dot">•</span> Contact The Herald
            </span>
            <h1>Reach the newsroom</h1>
            <p>
              Story tips, corrections, partnerships, or just a note for the
              editors — this is the fastest way to reach the right desk.
            </p>
          </div>
        </div>

        {/* BODY — form + info sidebar */}
        <div className="ledger-contact-body">
          <div className="ledger-contact-grid">
            <form
              className="ledger-contact-form"
              ref={formCardRef}
              onSubmit={handleSubmit}
            >
              <span className="ledger-eyebrow">Send a message</span>

              {error && (
                <div className="ledger-alert ledger-alert--error">
                  <span>Error</span>
                  {error}
                </div>
              )}

              {success && (
                <div className="ledger-alert ledger-alert--success">
                  <span>Sent</span>
                  {success}
                </div>
              )}

              <div className="ledger-contact-row">
                <div className="ledger-contact-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="ledger-contact-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="ledger-contact-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                />
              </div>

              <div className="ledger-contact-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows={7}
                  required
                />
              </div>

              <button
                type="submit"
                className="ledger-contact-btn"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message →"}
              </button>
            </form>

            <div className="ledger-contact-info" ref={infoCardRef}>
              <span className="ledger-eyebrow">General inquiries</span>

              <div className="ledger-contact-info-item">
                <span className="ledger-contact-info-label">Email</span>
                <p>desk@thedailyledger.com</p>
              </div>

              <div className="ledger-contact-info-item">
                <span className="ledger-contact-info-label">Phone</span>
                <p>+1 (212) 555-0148</p>
              </div>

              <div className="ledger-contact-info-item">
                <span className="ledger-contact-info-label">Hours</span>
                <p>Monday – Friday, 9:00 AM – 6:00 PM EST</p>
              </div>

              <div className="ledger-contact-info-item">
                <span className="ledger-contact-info-label">WhatsApp</span>

                <a
                  href="https://wa.me/916238612757?text=Hello%20I%20would%20like%20to%20contact%20The%20Daily%20Ledger."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ledger-whatsapp-btn"
                >
                  💬 Chat with us on WhatsApp
                </a>
              </div>

              <div className="ledger-contact-info-item">
                <span className="ledger-contact-info-label">Follow</span>

                <p className="ledger-contact-socials">
                  <span>Twitter — @dailyledger</span>
                  <span>Instagram — @dailyledger</span>
                  <span>LinkedIn — The Daily Ledger</span>
                </p>
              </div>
            </div>
          </div>

          {/* BUREAUS — dateline-style office directory */}
          <div className="ledger-bureaus" ref={bureausRef}>
            <span className="ledger-eyebrow">Our bureaus</span>
            <h2>Where to find us</h2>

            <div className="ledger-bureaus-grid">
              {bureaus.map((b, idx) => (
                <div
                  className="ledger-bureau"
                  key={b.city}
                  ref={(el) => (bureauItemsRef.current[idx] = el)}
                >
                  <span className="ledger-bureau-city">
                    {b.city.toUpperCase()} —
                  </span>
                  <p>{b.address}</p>
                  <span className="ledger-bureau-phone">{b.phone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/916238612757?text=Hello%20I%20would%20like%20to%20contact%20The%20Daily%20Ledger."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        title="Chat with us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="34"
          height="34"
          fill="currentColor"
        >
          <path d="M16.04 3C8.85 3 3 8.79 3 15.93c0 2.52.73 4.95 2.11 7.05L3 29l6.24-2.04a13.2 13.2 0 006.8 1.88H16c7.19 0 13.04-5.79 13.04-12.93C29.04 8.79 23.19 3 16.04 3zm7.59 18.26c-.32.9-1.84 1.67-2.55 1.79-.68.12-1.54.17-2.49-.13-.58-.18-1.32-.43-2.28-.84-4.02-1.72-6.64-5.94-6.84-6.21-.19-.27-1.63-2.14-1.63-4.09 0-1.95 1.02-2.91 1.38-3.31.36-.39.79-.49 1.05-.49.27 0 .53.01.76.02.24.01.56-.09.88.67.33.79 1.12 2.72 1.22 2.91.1.2.16.43.03.7-.13.27-.19.43-.39.66-.19.23-.4.51-.57.68-.19.19-.39.39-.17.76.23.39 1.02 1.67 2.18 2.7 1.5 1.34 2.77 1.76 3.16 1.95.39.2.61.17.84-.1.23-.27.97-1.13 1.23-1.52.26-.39.52-.33.88-.2.36.13 2.29 1.08 2.68 1.28.39.2.65.3.74.46.1.17.1.96-.22 1.86z" />
        </svg>
      </a>
      <Footer />
    </>
  );
};

export default ContactPage;

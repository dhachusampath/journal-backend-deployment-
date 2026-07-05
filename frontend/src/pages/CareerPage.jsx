import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import "./Career.css";

gsap.registerPlugin(ScrollTrigger);

const CAREERS_EMAIL = "careers@thedailyledger.com";

const values = [
  {
    num: "01",
    title: "Editorial Independence",
    text: "No owner, advertiser, or algorithm tells you what to cover. Editorial calls stay with the reporter and the desk.",
  },
  {
    num: "02",
    title: "Real Mentorship",
    text: "Every junior reporter is paired with a senior editor for their first year — not a one-off orientation, an ongoing relationship.",
  },
  {
    num: "03",
    title: "Work That Matters",
    text: "Our stories have changed municipal policy, reopened closed cases, and moved markets. Your byline will mean something.",
  },
];

const perks = [
  "Health & dental coverage",
  "Remote-friendly roles",
  "Annual learning budget",
  "Press credentials & travel support",
  "Flexible hours",
  "Parental leave",
];

const openRoles = [
  {
    title: "Staff Reporter — Politics",
    dept: "Politics Desk",
    location: "New York, NY",
    type: "Full-time",
  },
  {
    title: "Investigative Journalist",
    dept: "Investigations",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Photojournalist",
    dept: "Visual Desk",
    location: "Mumbai",
    type: "Contract",
  },
  {
    title: "Audience Growth Editor",
    dept: "Digital",
    location: "London",
    type: "Full-time",
  },
  {
    title: "Copy Editor",
    dept: "Editorial",
    location: "Remote",
    type: "Part-time",
  },
];

const buildApplyMailto = (roleTitle) =>
  `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
    `Application: ${roleTitle}`,
  )}&body=${encodeURIComponent(
    `Hi Daily Ledger team,\n\nI'd like to apply for the ${roleTitle} role.\n\nHere's a bit about me:\n\n`,
  )}`;

const CareerPage = () => {
  const sectionRef = useRef(null);
  const heroTextRef = useRef(null);
  const valuesTitleRef = useRef(null);
  const valueCardsRef = useRef([]);
  const perksRef = useRef(null);
  const perkItemsRef = useRef([]);
  const rolesTitleRef = useRef(null);
  const roleRowsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroTextRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
      );

      gsap.fromTo(
        valuesTitleRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: valuesTitleRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        valueCardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: { trigger: valueCardsRef.current[0], start: "top 88%" },
        },
      );

      gsap.fromTo(
        perkItemsRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: perksRef.current, start: "top 88%" },
        },
      );

      gsap.fromTo(
        rolesTitleRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: rolesTitleRef.current, start: "top 85%" },
        },
      );

      roleRowsRef.current.forEach((row) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%" },
          },
        );
      });

      gsap.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />

      <div className="ledger-career-page" ref={sectionRef}>
        {/* HERO */}
        <div className="ledger-career-hero">
          <div className="ledger-career-hero-inner" ref={heroTextRef}>
            <span className="ledger-eyebrow ledger-eyebrow--inverse">
              <span className="ledger-dot">•</span> Careers
            </span>
            <h1>Join the newsroom</h1>
            <p>
              We're always looking for reporters, editors, and journalists who
              care about getting it right. If you'd rather chase a real story
              than a pageview, you'll fit in here.
            </p>
          </div>
        </div>

        {/* VALUES */}
        <div className="ledger-career-values">
          <h2 className="ledger-career-values-title" ref={valuesTitleRef}>
            Why work here
          </h2>

          <div className="ledger-career-values-grid">
            {values.map((value, idx) => (
              <div
                key={value.num}
                className="ledger-career-value"
                ref={(el) => (valueCardsRef.current[idx] = el)}
              >
                <span className="ledger-career-value-num">{value.num}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PERKS */}
        <div className="ledger-career-perks" ref={perksRef}>
          <span className="ledger-career-perks-label">Benefits &amp; perks</span>
          <div className="ledger-career-perks-row">
            {perks.map((perk, idx) => (
              <span
                key={perk}
                className="ledger-career-perk"
                ref={(el) => (perkItemsRef.current[idx] = el)}
              >
                {perk}
              </span>
            ))}
          </div>
        </div>

        {/* OPEN ROLES */}
        <div className="ledger-career-roles">
          <h2 className="ledger-career-roles-title" ref={rolesTitleRef}>
            Open roles
          </h2>

          <div className="ledger-career-roles-list">
            {openRoles.map((role, idx) => (
              <div
                key={role.title}
                className="ledger-career-role"
                ref={(el) => (roleRowsRef.current[idx] = el)}
              >
                <div className="ledger-career-role-info">
                  <h4>{role.title}</h4>
                  <div className="ledger-career-role-meta">
                    <span>{role.dept}</span>
                    <span className="ledger-career-role-dot">·</span>
                    <span>{role.location}</span>
                    <span className="ledger-career-role-dot">·</span>
                    <span>{role.type}</span>
                  </div>
                </div>

                <a
                  className="ledger-career-apply-btn"
                  href={buildApplyMailto(role.title)}
                >
                  Apply →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CLOSING CTA */}
        <div className="ledger-career-cta">
          <div className="ledger-career-cta-inner" ref={ctaRef}>
            <span className="ledger-eyebrow ledger-eyebrow--inverse">
              <span className="ledger-dot">•</span> Don't see the right role?
            </span>
            <h2>We're always reading</h2>
            <p>
              Send your resume and a couple of clips to our editors — great
              writers get noticed even without an open posting.
            </p>
            <a
              className="ledger-career-cta-btn"
              href={buildApplyMailto("General Application")}
            >
              Email Your Resume →
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerPage;
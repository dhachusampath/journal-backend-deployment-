import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";
import Footer from "../Footer";
import { useNavigate, Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const navigate = useNavigate();

  const stats = [
    { value: "98%", label: "Reader trust in our fact-checked reporting" },
    { value: "12+", label: "Years of award-winning journalism" },
    { value: "3200+", label: "Original stories published every year" },
    { value: "50m", label: "Readers worldwide, informed every day" },
  ];

  const logos = ["PressWire", "NewsSync", "MediaLink", "Chronicle"];

  const values = [
    {
      num: "01",
      title: "Accuracy First",
      text: "Every claim is checked against primary sources before it reaches a reader — no exceptions for speed.",
    },
    {
      num: "02",
      title: "Independent Voice",
      text: "No owner, advertiser, or algorithm decides what we cover. Editorial calls stay with the newsroom.",
    },
    {
      num: "03",
      title: "Radical Transparency",
      text: "When we get something wrong, we say so clearly, on the record, and in the same place we said it first.",
    },
  ];

  const milestones = [
    {
      year: "2014",
      title: "Founded above a print shop",
      text: "Three reporters and a secondhand printer began covering city council meetings no one else showed up to.",
    },
    {
      year: "2017",
      title: "Investigations desk launched",
      text: "A dedicated team began the long-form work that would define the paper's reputation for accountability journalism.",
    },
    {
      year: "2020",
      title: "10 million monthly readers",
      text: "Digital readership crossed eight figures as the newsroom expanded into daily audio briefings.",
    },
    {
      year: "2023",
      title: "First national press award",
      text: "Recognition for a year-long investigation into municipal water contracts, cited for its use of public records.",
    },
    {
      year: "2026",
      title: "Twelve international bureaus",
      text: "Correspondents now file from twelve cities, keeping local reporting standards on every global story.",
    },
  ];

  const team = [
    {
      id: 1,
      name: "Carter Dokidis",
      role: "Editor-in-Chief",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Livia Saria",
      role: "Head of Investigations",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Zaire Workman",
      role: "Politics Correspondent",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Alfonso Sarter",
      role: "Technology Desk",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Reyna Vaccaro",
      role: "World News Editor",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Marcus Schaefer",
      role: "Photojournalist",
      img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
    },
  ];

  // Refs
  const wrapperRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroParaRef = useRef(null);
  const imageCardsRef = useRef([]);
  const badgeRefs = useRef([]);
  const descHeadingRef = useRef(null);
  const statCardsRef = useRef([]);
  const logoItemsRef = useRef([]);
  const teamTitleRef = useRef(null);
  const teamCardsRef = useRef([]);
  const quoteRef = useRef(null);
  const valuesTitleRef = useRef(null);
  const valueCardsRef = useRef([]);
  const timelineTitleRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---------- HERO SECTION ----------
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .fromTo(
          heroHeadingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
        )
        .fromTo(
          heroParaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4",
        )
        .fromTo(
          imageCardsRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "back.out(1.4)",
          },
          "-=0.3",
        );

      // ---------- ABOUT / STATS SECTION ----------
      gsap.fromTo(
        badgeRefs.current[0],
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: badgeRefs.current[0],
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        descHeadingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descHeadingRef.current,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        statCardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statCardsRef.current[0],
            start: "top 90%",
          },
        },
      );

      // Animated counter for stat numbers
      statCardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const valueEl = card.querySelector("h3");
        const rawValue = stats[idx].value;
        const numMatch = rawValue.match(/[\d.]+/);

        if (numMatch) {
          const numTarget = parseFloat(numMatch[0]);
          const suffix = rawValue.replace(numMatch[0], "");
          const prefix = rawValue.startsWith("$") ? "$" : "";

          const counter = { val: 0 };
          gsap.to(counter, {
            val: numTarget,
            duration: 1.4,
            ease: "power1.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
            onUpdate: () => {
              const isDecimal = numMatch[0].includes(".");
              valueEl.textContent =
                prefix +
                (isDecimal ? counter.val.toFixed(1) : Math.floor(counter.val)) +
                suffix;
            },
          });
        }
      });

      gsap.fromTo(
        logoItemsRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: logoItemsRef.current[0],
            start: "top 95%",
          },
        },
      );

      // ---------- TEAM SECTION ----------
      gsap.fromTo(
        badgeRefs.current[1],
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: badgeRefs.current[1],
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        teamTitleRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamTitleRef.current,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        teamCardsRef.current,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: teamCardsRef.current[0],
            start: "top 90%",
          },
        },
      );

      // Team card hover lift
      teamCardsRef.current.forEach((card) => {
        if (!card) return;
        const enter = () =>
          gsap.to(card, { y: -8, duration: 0.35, ease: "power2.out" });
        const leave = () =>
          gsap.to(card, { y: 0, duration: 0.35, ease: "power2.out" });

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);

        card._enter = enter;
        card._leave = leave;
      });

      // ---------- PULL QUOTE ----------
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 85%" },
        },
      );

      // ---------- VALUES / PRINCIPLES ----------
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
          scrollTrigger: {
            trigger: valueCardsRef.current[0],
            start: "top 88%",
          },
        },
      );

      // ---------- TIMELINE ----------
      gsap.fromTo(
        timelineTitleRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineTitleRef.current,
            start: "top 85%",
          },
        },
      );

      timelineItemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%" },
          },
        );
      });

      // ---------- CLOSING CTA ----------
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
    }, wrapperRef);

    return () => {
      teamCardsRef.current.forEach((card) => {
        if (card && card._enter) {
          card.removeEventListener("mouseenter", card._enter);
          card.removeEventListener("mouseleave", card._leave);
        }
      });
      ctx.revert();
    };
  }, []);

  return (
    <div className="ledger-about-page" ref={wrapperRef}>
      {/* 1. HERO — inverted "front page" plate */}
      <div className="ledger-about-hero">
        <div className="ledger-about-hero-inner">
          <div className="ledger-about-hero-text" ref={heroTextRef}>
            <span className="ledger-eyebrow ledger-eyebrow--inverse">
              <span className="ledger-dot">•</span> About The Herald
            </span>

            <h1 ref={heroHeadingRef}>
              Reporting the truth,
              <br />
              one story at a time
            </h1>

            <p ref={heroParaRef}>
              For over a decade, our newsroom has delivered fact-checked,
              independent journalism that keeps communities informed and
              accountable.
            </p>
          </div>

          <div className="ledger-about-image-grid">
            {[
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=600&auto=format&fit=crop",
            ].map((src, i) => (
              <div
                key={i}
                className="ledger-about-image-card"
                ref={(el) => (imageCardsRef.current[i] = el)}
              >
                <img src={src} alt="Newsroom" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. STATS & DESCRIPTION SECTION */}
      <div className="ledger-about-body">
        <div className="ledger-about-grid">
          <div
            className="ledger-about-badge"
            ref={(el) => (badgeRefs.current[0] = el)}
          >
            <span className="ledger-eyebrow">
              <span className="ledger-dot">•</span> About The Herald
            </span>
          </div>

          <div className="ledger-about-desc-content">
            <h2 ref={descHeadingRef}>
              With over 12 years of experience, we specialize in delivering
              accurate, unbiased reporting across politics, technology, world
              affairs, and business. Our newsroom is committed to transparency
              and giving readers the context behind every headline.
            </h2>

            <div className="ledger-about-stats">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="ledger-about-stat"
                  ref={(el) => (statCardsRef.current[idx] = el)}
                >
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="ledger-about-logos">
              <span className="ledger-about-logos-label">As featured in</span>
              <div className="ledger-about-logos-row">
                {logos.map((logo, idx) => (
                  <span
                    key={idx}
                    className="ledger-about-logo-item"
                    ref={(el) => (logoItemsRef.current[idx] = el)}
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2.5 PULL QUOTE */}
      <div className="ledger-quote-section">
        <blockquote className="ledger-quote" ref={quoteRef}>
          "The Herald doesn't just report the news — it explains why it matters,
          and it does the work most newsrooms have stopped doing."
          <cite>— Elena Castillo, Media Critic, The Correspondent</cite>
        </blockquote>
      </div>

      {/* 2.6 VALUES / PRINCIPLES */}
      <div className="ledger-values">
        <div className="ledger-values-inner">
          <h2 className="ledger-values-title" ref={valuesTitleRef}>
            What we stand for
          </h2>

          <div className="ledger-values-grid">
            {values.map((value, idx) => (
              <div
                key={value.num}
                className="ledger-value-card"
                ref={(el) => (valueCardsRef.current[idx] = el)}
              >
                <span className="ledger-value-num">{value.num}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.7 MILESTONES TIMELINE */}
      <div className="ledger-timeline-section">
        <div className="ledger-timeline-inner">
          <h2 className="ledger-timeline-title" ref={timelineTitleRef}>
            How we got here
          </h2>

          <div className="ledger-timeline">
            {milestones.map((item, idx) => (
              <div
                key={item.year}
                className="ledger-timeline-item"
                ref={(el) => (timelineItemsRef.current[idx] = el)}
              >
                <span className="ledger-timeline-year">{item.year}</span>
                <div className="ledger-timeline-content">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. TEAM SECTION */}
      <div className="ledger-team">
        <div className="ledger-team-inner">
          <span
            className="ledger-eyebrow"
            ref={(el) => (badgeRefs.current[1] = el)}
          >
            <span className="ledger-dot">•</span> Team
          </span>

          <h2 className="ledger-team-title" ref={teamTitleRef}>
            Our newsroom
          </h2>

          <div className="ledger-team-grid">
            {team.map((member, idx) => (
              <div
                key={member.id}
                className="ledger-team-card"
                ref={(el) => (teamCardsRef.current[idx] = el)}
              >
                <div className="ledger-team-photo">
                  <img src={member.img} alt={member.name} />
                </div>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. CLOSING CTA — inverted bookend to match the hero */}
      <div className="ledger-cta">
        <div className="ledger-cta-inner" ref={ctaRef}>
          <span className="ledger-eyebrow ledger-eyebrow--inverse">
            <span className="ledger-dot">•</span> Careers
          </span>
          <h2>Join the newsroom</h2>
          <p>
            We're always looking for reporters, editors, and photojournalists
            who care about getting it right. Open roles span our city desk,
            investigations team, and international bureaus.
          </p>

          <Link to="/career">
            <button className="ledger-cta-btn">View Open Roles →</button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;

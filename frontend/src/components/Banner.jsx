import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import "./Banner.css";

const Banner = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const ruleThickRef = useRef(null);
  const ruleThinRef = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const bylineRef = useRef(null);
  const btnRef = useRef(null);
  const dividerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const stampRef = useRef(null);
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const tickerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.fromTo(
      ruleThickRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.7, ease: "power2.inOut", transformOrigin: "left center" },
    )
      .fromTo(
        ruleThinRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power2.inOut", transformOrigin: "left center" },
        "-=0.35",
      )
      .fromTo(
        tagRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.1",
      )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.15",
      )
      .fromTo(
        paraRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5",
      )
      .fromTo(
        bylineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.4",
      )
      .fromTo(
        btnRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.35",
      )
      .fromTo(
        dividerRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.8, ease: "power2.inOut", transformOrigin: "top center" },
        "-=0.9",
      )
      .fromTo(
        imageWrapperRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.9 },
        "-=0.8",
      )
      .fromTo(
        stampRef.current,
        { opacity: 0, scale: 0.6, rotate: -20 },
        { opacity: 1, scale: 1, rotate: -8, duration: 0.6, ease: "back.out(2)" },
        "-=0.4",
      )
      .fromTo(
        cardRef.current,
        { opacity: 0, x: 40, y: -15 },
        { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "back.out(1.6)" },
        "-=0.5",
      )
      .fromTo(
        progressRef.current,
        { width: "0%" },
        { width: "72%", duration: 1, ease: "power2.inOut" },
        "-=0.3",
      )
      .fromTo(
        tickerRef.current ? tickerRef.current.children : [],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.12 },
        "-=0.4",
      );

    gsap.to(stampRef.current, {
      rotate: -4,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: tl.duration(),
    });

    const btn = btnRef.current;
    const handleEnter = () =>
      gsap.to(btn, { x: 6, duration: 0.3, ease: "power2.out" });
    const handleLeave = () =>
      gsap.to(btn, { x: 0, duration: 0.3, ease: "power2.out" });

    btn.addEventListener("mouseenter", handleEnter);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      btn.removeEventListener("mouseenter", handleEnter);
      btn.removeEventListener("mouseleave", handleLeave);
      tl.kill();
    };
  }, []);

  return (
    <section className="ledger-hero" ref={sectionRef}>
      <div className="ledger-masthead">
        <div className="ledger-masthead-row">
          <span className="ledger-brand">The Daily Ledger</span>
          <span className="ledger-meta">Sat, Jul 4 · Weekend Edition</span>
        </div>
        <div className="ledger-rule-thick" ref={ruleThickRef}></div>
        <div className="ledger-rule-thin" ref={ruleThinRef}></div>
      </div>

      <div className="ledger-body">
        <div className="ledger-col-left">
          <span className="ledger-tag" ref={tagRef}>
            Breaking · Top Story
          </span>

          <h1 ref={headingRef}>
            Breaking Stories,
            <br />
            Told With Depth
          </h1>

          <p ref={paraRef}>
            From global affairs to grassroots movements, our newsroom brings
            you verified reporting and in-depth analysis you can trust —
            published daily, curated for clarity.
          </p>

          <span className="ledger-byline" ref={bylineRef}>
            By Newsroom Desk · 6 min read
          </span>

          <button
            className="ledger-btn"
            ref={btnRef}
            onClick={() => navigate("/news")}
          >
            Read Today's Edition <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="ledger-divider" ref={dividerRef}></div>

        <div className="ledger-col-right">
          <div className="ledger-image-wrapper" ref={imageWrapperRef}>
            <img
              src="https://cdn.prod.website-files.com/67d862cdd02d4b66561d21e6/67d862cdd02d4b66561d233f_Frame%202147227058.webp"
              alt="Newsroom banner"
            />
            <span className="ledger-stamp" ref={stampRef}>
              VOL. 42
            </span>
            <span className="ledger-caption">Photo — Newsroom Archives</span>
          </div>

          <div className="ledger-editors-pick" ref={cardRef}>
            <span className="ledger-pick-label">Editor's Pick</span>
            <h4>Inside the Story of the Year</h4>
            <div className="ledger-progress-bar">
              <div className="ledger-progress" ref={progressRef}></div>
            </div>
            <span className="ledger-progress-label">72% read</span>
          </div>
        </div>
      </div>

      <div className="ledger-ticker">
        <span className="ledger-ticker-label">More in this edition</span>
        <ul ref={tickerRef}>
          <li>
            <span className="ledger-ticker-index">01</span>Markets rally as
            inflation cools
          </li>
          <li>
            <span className="ledger-ticker-index">02</span>The quiet return of
            vinyl culture
          </li>
          <li>
            <span className="ledger-ticker-index">03</span>Inside the last
            print newsroom
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Banner;
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Expertise.css";

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
  const sectionRef = useRef(null);
  const topRef = useRef(null);
  const ruleRef = useRef(null);
  const statsRef = useRef(null);
  const bottomTextRef = useRef(null);
  const bottomImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        topRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: topRef.current, start: "top 80%" },
        },
      );

      gsap.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
          transformOrigin: "left center",
          scrollTrigger: { trigger: ruleRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        bottomTextRef.current.children,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: bottomTextRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        bottomImageRef.current,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: bottomImageRef.current, start: "top 85%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ledger-about" ref={sectionRef}>
      {/* TOP TEXT SECTION */}
      <div className="ledger-about-top" ref={topRef}>
        <span className="ledger-eyebrow">About The Herald</span>

        <h2 className="ledger-about-title">
          For over a decade, we've delivered honest reporting that keeps our
          readers informed and empowered.
        </h2>

        <p className="ledger-about-desc">
          By staying close to the communities we cover, our newsroom delivers
          fact-checked stories and thoughtful analysis — built on integrity,
          sourced with care.
        </p>
      </div>

      <div className="ledger-about-rule" ref={ruleRef}></div>

      {/* STATS STRIP */}
      <div className="ledger-stats" ref={statsRef}>
        <div className="ledger-stat">
          <h3>
            98<span>%</span>
          </h3>
          <p>Reader trust in our fact-checked reporting</p>
        </div>

        <div className="ledger-stat">
          <h3>
            12<span>+</span>
          </h3>
          <p>Years of award-winning journalism</p>
        </div>

        <div className="ledger-stat">
          <h3>3,200</h3>
          <p>Original stories published every year</p>
        </div>

        <div className="ledger-stat">
          <h3>
            50<span>m</span>
          </h3>
          <p>Readers worldwide, informed every day</p>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="ledger-about-bottom">
        <div className="ledger-bottom-text" ref={bottomTextRef}>
          <span className="ledger-eyebrow">Our Newsroom</span>

          <h2 className="ledger-about-title">
            Discover our commitment to the truth
          </h2>

          <p className="ledger-about-desc">
            For over a decade, our journalists have chased the story behind the
            story. From breaking news to long-form investigations, our team is
            driven by accuracy, transparency, and a deep respect for our
            readers' trust.
          </p>
        </div>

        <div className="ledger-bottom-image" ref={bottomImageRef}>
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Newsroom team discussion"
          />
          <span className="ledger-stamp ledger-stamp--sm">Est. 2014</span>
          <span className="ledger-caption">Photo — Newsroom Archives</span>
        </div>
      </div>
    </section>
  );
};

export default Expertise;

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./LatestStories.css";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    id: 1,
    featured: true,
    category: "Box Office",
    title: "Weekend Blockbuster Shatters Opening Day Records Worldwide",
    excerpt:
      "The sci-fi epic pulled in unprecedented numbers across international markets, marking the biggest debut of the year and reshaping the summer release calendar.",
    author: "Meera Kapoor",
    date: "Jul 3",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    category: "Politics",
    title: "Trade Talks Collapse After Late-Night Session in Geneva",
    excerpt:
      "Negotiators walked away without a deal as both delegations cited unresolved disputes over tariffs on agricultural exports.",
    author: "Arjun Nair",
    date: "Jul 3",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    category: "Markets",
    title: "Central Bank Holds Rates Steady, Signals Caution Ahead",
    excerpt:
      "Policymakers pointed to easing inflation but warned that global supply pressures remain a risk through the rest of the year.",
    author: "Rhea Fernandes",
    date: "Jul 2",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    category: "Technology",
    title: "Startup Unveils Chip Claiming Triple the Efficiency",
    excerpt:
      "The announcement sent competitor stocks lower as analysts weigh the real-world impact on data-center power costs.",
    author: "Devika Rao",
    date: "Jul 1",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
];

const LatestStories = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredStory = stories.find((s) => s.featured);
  const otherStories = stories.filter((s) => !s.featured);

  return (
    <section className="ledger-stories" ref={sectionRef}>
      <div className="ledger-stories-header" ref={headerRef}>
        <span className="ledger-eyebrow">Latest Headlines</span>
        <h2 className="ledger-stories-title">What's making news today</h2>
      </div>

      <div className="ledger-stories-rule"></div>

      <div className="ledger-stories-grid" ref={gridRef}>
        <article className="ledger-story ledger-story--featured">
          <div className="ledger-story-image">
            <img src={featuredStory.image} alt={featuredStory.title} />
          </div>
          <span className="ledger-story-category">
            {featuredStory.category}
          </span>
          <h3>{featuredStory.title}</h3>
          <p>{featuredStory.excerpt}</p>
          <div className="ledger-story-meta">
            <span>{featuredStory.author}</span>
            <span className="ledger-story-dot">·</span>
            <span>{featuredStory.date}</span>
            <span className="ledger-story-dot">·</span>
            <span>{featuredStory.readTime}</span>
          </div>
        </article>

        <div className="ledger-story-list">
          {otherStories.map((story) => (
            <article className="ledger-story ledger-story--row" key={story.id}>
              <div className="ledger-story-image">
                <img src={story.image} alt={story.title} />
              </div>
              <div className="ledger-story-body">
                <span className="ledger-story-category">{story.category}</span>
                <h3>{story.title}</h3>
                <div className="ledger-story-meta">
                  <span>{story.author}</span>
                  <span className="ledger-story-dot">·</span>
                  <span>{story.date}</span>
                  <span className="ledger-story-dot">·</span>
                  <span>{story.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestStories;

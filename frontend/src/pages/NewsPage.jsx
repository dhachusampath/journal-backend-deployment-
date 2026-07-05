import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import "./News.css";
import Footer from "../components/Footer";

const ARTICLE_API = `${import.meta.env.VITE_API_URL}/articles`;
const JOURNAL_API = `${import.meta.env.VITE_API_URL}/journals`;

const emptyArticleForm = {
  title: "",
  content: "",
  category: "",
  image: null,
  location: "",
};
const emptyJournalForm = { title: "", content: "", mood: "🙂" };

const MOODS = ["🙂", "😄", "😐", "😔", "😤", "😴"];

const placeholderImg = (seed, w = 480, h = 280) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

// ---------- static category grid data ----------
const CATEGORIES = [
  { name: "Politics", icon: "🏛️", desc: "Policy, elections & government" },
  { name: "Technology", icon: "💻", desc: "Startups, AI & product news" },
  { name: "Business", icon: "📈", desc: "Markets, finance & economy" },
  { name: "World", icon: "🌍", desc: "Global affairs & foreign desk" },
  { name: "Culture", icon: "🎭", desc: "Art, film & society" },
  { name: "Sports", icon: "🏆", desc: "Scores, transfers & analysis" },
];

const NewsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const authHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const [activeTab, setActiveTab] = useState("articles");

  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [articleError, setArticleError] = useState("");
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [articleForm, setArticleForm] = useState(emptyArticleForm);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [savingArticle, setSavingArticle] = useState(false);
  const [deletingArticleId, setDeletingArticleId] = useState(null);

  const [journals, setJournals] = useState([]);
  const [loadingJournals, setLoadingJournals] = useState(false);
  const [journalError, setJournalError] = useState("");
  const [showJournalForm, setShowJournalForm] = useState(false);
  const [journalForm, setJournalForm] = useState(emptyJournalForm);
  const [editingJournalId, setEditingJournalId] = useState(null);
  const [savingJournal, setSavingJournal] = useState(false);
  const [deletingJournalId, setDeletingJournalId] = useState(null);

  const fetchArticles = async () => {
    try {
      setLoadingArticles(true);
      setArticleError("");
      const response = await fetch(ARTICLE_API);
      if (!response.ok) throw new Error("Unable to load articles");
      const data = await response.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      setArticleError(err.message);
    } finally {
      setLoadingArticles(false);
    }
  };

  const fetchJournals = async () => {
    if (!token) return;
    try {
      setLoadingJournals(true);
      setJournalError("");
      const res = await fetch(`${JOURNAL_API}`, { headers: authHeaders });
      if (!res.ok) throw new Error("Failed to load journal entries");
      const data = await res.json();
      setJournals(data);
    } catch (err) {
      setJournalError(err.message);
    } finally {
      setLoadingJournals(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    if (token) fetchJournals();
  }, [token]);

  // Lock background scroll while a modal is open. Without this, on mobile
  // the page behind can capture swipe gestures meant for the modal,
  // which is a common cause of "scrolling doesn't work" reports.
  // Lock background scroll while a modal is open - Fixed for mobile scrolling
  useEffect(() => {
    const modalOpen = showArticleForm || showJournalForm;

    if (modalOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;

      // Lock the body scroll but allow the modal to scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";

      // Ensure the modal overlay is scrollable
      const overlay = document.querySelector(".news-form-overlay");
      if (overlay) {
        overlay.style.overflowY = "auto";
        overlay.style.height = "100vh";
        overlay.style.height = "100dvh";
        overlay.style.webkitOverflowScrolling = "touch";
      }
    } else {
      // Restore scroll position when modal closes
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.height = "";

      // Reset overlay styles
      const overlay = document.querySelector(".news-form-overlay");
      if (overlay) {
        overlay.style.overflowY = "";
        overlay.style.height = "";
        overlay.style.webkitOverflowScrolling = "";
      }

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }

    return () => {
      // Cleanup
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.height = "";

      const overlay = document.querySelector(".news-form-overlay");
      if (overlay) {
        overlay.style.overflowY = "";
        overlay.style.height = "";
        overlay.style.webkitOverflowScrolling = "";
      }
    };
  }, [showArticleForm, showJournalForm]);
  const openCreateArticle = () => {
    setEditingArticleId(null);
    setArticleForm(emptyArticleForm);
    setShowArticleForm(true);
  };

  const openEditArticle = (article) => {
    setEditingArticleId(article._id);
    setArticleForm({
      title: article.title || "",
      content: article.content || "",
      category: article.category || "",
      image: null,
      location: article.location || "",
    });
    setShowArticleForm(true);
  };

  const closeArticleForm = () => {
    setShowArticleForm(false);
    setEditingArticleId(null);
    setArticleForm(emptyArticleForm);
  };

  const handleArticleChange = (e) => {
    setArticleForm({ ...articleForm, [e.target.name]: e.target.value });
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();

    if (!articleForm.title.trim() || !articleForm.content.trim()) {
      setArticleError("Title and content are required.");
      return;
    }

    try {
      setSavingArticle(true);
      setArticleError("");

      const url = editingArticleId
        ? `${ARTICLE_API}/${editingArticleId}`
        : ARTICLE_API;

      const method = editingArticleId ? "PUT" : "POST";

      const formData = new FormData();

      formData.append("title", articleForm.title);
      formData.append("content", articleForm.content);
      formData.append("category", articleForm.category);
      formData.append("location", articleForm.location);

      if (articleForm.image) {
        formData.append("image", articleForm.image);
      }

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to save article");
      }

      const saved = await res.json();

      setArticles((prev) =>
        editingArticleId
          ? prev.map((a) => (a._id === editingArticleId ? saved : a))
          : [saved, ...prev],
      );

      closeArticleForm();
    } catch (err) {
      setArticleError(err.message);
    } finally {
      setSavingArticle(false);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Delete this article? This can't be undone.")) return;
    try {
      setDeletingArticleId(id);
      setArticleError("");
      const res = await fetch(`${ARTICLE_API}/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to delete article");
      }
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      setArticleError(err.message);
    } finally {
      setDeletingArticleId(null);
    }
  };

  const isArticleOwner = (article) => {
    if (!currentUser || !article.author) return false;
    const currentId = currentUser.id || currentUser._id;
    const authorId = article.author._id || article.author.id;
    return currentId && authorId && String(currentId) === String(authorId);
  };

  const openCreateJournal = () => {
    setEditingJournalId(null);
    setJournalForm(emptyJournalForm);
    setShowJournalForm(true);
  };

  const openEditJournal = (entry) => {
    setEditingJournalId(entry._id);
    setJournalForm({
      title: entry.title || "",
      content: entry.content || "",
      mood: entry.mood || "🙂",
    });
    setShowJournalForm(true);
  };

  const closeJournalForm = () => {
    setShowJournalForm(false);
    setEditingJournalId(null);
    setJournalForm(emptyJournalForm);
  };

  const handleJournalChange = (e) => {
    setJournalForm({ ...journalForm, [e.target.name]: e.target.value });
  };

  const handleJournalSubmit = async (e) => {
    e.preventDefault();
    if (!journalForm.title.trim() || !journalForm.content.trim()) {
      setJournalError("Title and content are required.");
      return;
    }
    try {
      setSavingJournal(true);
      setJournalError("");
      const url = editingJournalId
        ? `${JOURNAL_API}/${editingJournalId}`
        : JOURNAL_API;
      const method = editingJournalId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(journalForm),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to save journal entry");
      }
      const saved = await res.json();
      setJournals((prev) =>
        editingJournalId
          ? prev.map((j) => (j._id === editingJournalId ? saved : j))
          : [saved, ...prev],
      );
      closeJournalForm();
    } catch (err) {
      setJournalError(err.message);
    } finally {
      setSavingJournal(false);
    }
  };

  const handleDeleteJournal = async (id) => {
    if (!window.confirm("Delete this journal entry? This can't be undone."))
      return;
    try {
      setDeletingJournalId(id);
      setJournalError("");
      const res = await fetch(`${JOURNAL_API}/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to delete journal entry");
      }
      setJournals((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      setJournalError(err.message);
    } finally {
      setDeletingJournalId(null);
    }
  };

  const featured = articles.slice(0, 6);
  const trending = articles.slice(0, 8);

  const visibleArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <>
      <Header />

      <main className="news-page">
        {/* ---------- HERO ---------- */}
        <section className="news-hero">
          <div className="news-hero__text">
            <span className="news-page__eyebrow">
              <span className="news-page__dot">•</span> Newsroom
            </span>
            <h1 className="news-page__title">Stories &amp; Reflections</h1>
            <p className="news-hero__sub">
              Published articles from the community, and a private space for
              your own notes.
            </p>
          </div>
          <img
            className="news-hero__img"
            src={placeholderImg("newsroom-hero", 640, 360)}
            alt="Newsroom desk with papers and coffee"
          />
        </section>

        {/* ---------- CATEGORY GRID ---------- */}
        <section className="category-section">
          <div className="category-section__head">
            <h2 className="featured-strip__title">Explore by category</h2>
            <span className="category-section__count">
              {CATEGORIES.length} sections
            </span>
          </div>
          <div className="category-grid">
            {CATEGORIES.map((cat, idx) => (
              <div
                className={`category-box ${
                  activeCategory === cat.name ? "category-box--active" : ""
                }`}
                key={cat.name}
                onClick={() =>
                  setSearchParams(
                    activeCategory === cat.name ? {} : { category: cat.name },
                  )
                }
              >
                <div className="category-box__top">
                  <span className="category-box__index">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="category-box__icon">{cat.icon}</span>
                </div>
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                <span className="category-box__arrow">→</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- FEATURED SCROLL STRIP ---------- */}
        {featured.length > 0 && (
          <section className="featured-strip">
            <h2 className="featured-strip__title">Featured</h2>
            <div className="featured-strip__scroller">
              {featured.map((article) => (
                <div className="featured-card" key={article._id}>
                  <img
                    src={article.imageUrl || placeholderImg(article._id)}
                    alt={article.title}
                  />
                  <span>{article.title}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------- TRENDING FEED ---------- */}
        {trending.length > 0 && (
          <section className="trending-feed">
            <h2 className="featured-strip__title">Trending now</h2>
            <div className="trending-feed__scroller">
              {trending.map((article, idx) => (
                <div className="trending-item" key={article._id}>
                  <span className="trending-item__rank">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <img
                    src={article.imageUrl || placeholderImg(article._id)}
                    alt={article.title}
                  />
                  <div className="trending-item__body">
                    <h4>{article.title}</h4>
                    {article.category && (
                      <span className="trending-item__category">
                        {article.category}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------- TABS ---------- */}
        <div className="news-tabs">
          <button
            className={`news-tab ${activeTab === "articles" ? "news-tab--active" : ""}`}
            onClick={() => setActiveTab("articles")}
          >
            Articles
          </button>
          {token && (
            <button
              className={`news-tab ${activeTab === "journal" ? "news-tab--active" : ""}`}
              onClick={() => setActiveTab("journal")}
            >
              My Journal
            </button>
          )}
        </div>

        {/* ================= ARTICLES TAB ================= */}
        {activeTab === "articles" && (
          <section>
            <div className="news-page__top">
              <h2 className="news-page__section-title">
                {activeCategory === "All"
                  ? "Latest Articles"
                  : `${activeCategory} Articles`}
              </h2>
              <div style={{ display: "flex", gap: "10px" }}>
                {activeCategory !== "All" && (
                  <button
                    className="btn btn--ghost"
                    onClick={() => setSearchParams({})}
                  >
                    Clear filter
                  </button>
                )}
                {token && (
                  <button
                    className="btn btn--primary"
                    onClick={openCreateArticle}
                  >
                    + New Article
                  </button>
                )}
              </div>
            </div>

            {articleError && (
              <div className="news-page__error">{articleError}</div>
            )}

            {showArticleForm && (
              <div className="news-form-overlay" onClick={closeArticleForm}>
                <form
                  className="news-form"
                  onClick={(e) => e.stopPropagation()}
                  onSubmit={handleArticleSubmit}
                >
                  <h2>{editingArticleId ? "Edit Article" : "New Article"}</h2>

                  <label>
                    Title
                    <input
                      type="text"
                      name="title"
                      value={articleForm.title}
                      onChange={handleArticleChange}
                      placeholder="Headline"
                      required
                    />
                  </label>

                  <label>
                    Category
                    <input
                      type="text"
                      name="category"
                      value={articleForm.category}
                      onChange={handleArticleChange}
                      placeholder="e.g. Technology"
                    />
                  </label>

                  <label>
                    Upload Image
                    <input
                      type="file"
                      accept="image/"
                      onChange={(e) => {
                        setArticleForm({
                          ...articleForm,
                          image: e.target.files[0],
                        });
                      }}
                    />
                  </label>

                  <label>
                    Content
                    <textarea
                      name="content"
                      value={articleForm.content}
                      onChange={handleArticleChange}
                      placeholder="Write the story..."
                      rows={7}
                      required
                    />
                  </label>
                  <label>
                    Location
                    <input
                      type="text"
                      name="location"
                      value={articleForm.location}
                      onChange={handleArticleChange}
                      required
                      placeholder="Enter Location"
                    />
                  </label>

                  <div className="news-form__actions">
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={closeArticleForm}
                      disabled={savingArticle}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn--primary"
                      disabled={savingArticle}
                    >
                      {savingArticle
                        ? "Saving..."
                        : editingArticleId
                          ? "Save Changes"
                          : "Publish"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loadingArticles ? (
              <div className="news-page__state">Loading articles...</div>
            ) : visibleArticles.length === 0 ? (
              <div className="news-page__state">
                {activeCategory === "All"
                  ? `No articles yet. ${token ? "Be the first to publish one." : ""}`
                  : `No articles in ${activeCategory} yet.`}
              </div>
            ) : (
              <div className="news-grid">
                {visibleArticles.map((article) => (
                  <article className="news-card" key={article._id}>
                    <img
                      className="news-card__img"
                      src={article.imageUrl || placeholderImg(article._id)}
                      alt={article.title}
                    />
                    <div className="news-card__body">
                      {article.category && (
                        <span className="news-card__category">
                          {article.category}
                        </span>
                      )}
                      <h3 className="news-card__title">{article.title}</h3>
                      <p className="news-card__content">{article.content}</p>

                      <div className="news-card__meta">
                        <span>{article.author?.name || "Unknown author"}</span>
                        <span>
                          {article.createdAt &&
                            new Date(article.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                        </span>
                      </div>

                      {isArticleOwner(article) && (
                        <div className="news-card__actions">
                          <button
                            className="btn btn--small btn--ghost"
                            onClick={() => openEditArticle(article)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn--small btn--danger"
                            onClick={() => handleDeleteArticle(article._id)}
                            disabled={deletingArticleId === article._id}
                          >
                            {deletingArticleId === article._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ================= JOURNAL TAB ================= */}
        {activeTab === "journal" && token && (
          <section>
            <div className="news-page__top">
              <h2 className="news-page__section-title">My Journal</h2>
              <button className="btn btn--primary" onClick={openCreateJournal}>
                + New Entry
              </button>
            </div>

            {journalError && (
              <div className="news-page__error">{journalError}</div>
            )}

            {showJournalForm && (
              <div className="news-form-overlay" onClick={closeJournalForm}>
                <form
                  className="news-form"
                  onClick={(e) => e.stopPropagation()}
                  onSubmit={handleJournalSubmit}
                >
                  <h2>
                    {editingJournalId ? "Edit Entry" : "New Journal Entry"}
                  </h2>

                  <label>
                    Title
                    <input
                      type="text"
                      name="title"
                      value={journalForm.title}
                      onChange={handleJournalChange}
                      placeholder="What's this entry about?"
                      required
                    />
                  </label>

                  <label>
                    Mood
                    <div className="mood-picker">
                      {MOODS.map((m) => (
                        <button
                          type="button"
                          key={m}
                          className={`mood-picker__option ${
                            journalForm.mood === m
                              ? "mood-picker__option--active"
                              : ""
                          }`}
                          onClick={() =>
                            setJournalForm({ ...journalForm, mood: m })
                          }
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </label>

                  <label>
                    Content
                    <textarea
                      name="content"
                      value={journalForm.content}
                      onChange={handleJournalChange}
                      placeholder="Write freely..."
                      rows={7}
                      required
                    />
                  </label>

                  <div className="news-form__actions">
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={closeJournalForm}
                      disabled={savingJournal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn--primary"
                      disabled={savingJournal}
                    >
                      {savingJournal
                        ? "Saving..."
                        : editingJournalId
                          ? "Save Changes"
                          : "Add Entry"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loadingJournals ? (
              <div className="news-page__state">Loading journal...</div>
            ) : journals.length === 0 ? (
              <div className="news-page__state">
                No entries yet. Write your first one.
              </div>
            ) : (
              <div className="journal-scroll">
                {journals.map((entry) => (
                  <div className="journal-entry" key={entry._id}>
                    <div className="journal-entry__mood">
                      {entry.mood || "🙂"}
                    </div>
                    <div className="journal-entry__body">
                      <div className="journal-entry__top">
                        <h3>{entry.title}</h3>
                        <span className="journal-entry__date">
                          {entry.createdAt &&
                            new Date(entry.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                        </span>
                      </div>
                      <p>{entry.content}</p>
                      <div className="news-card__actions">
                        <button
                          className="btn btn--small btn--ghost"
                          onClick={() => openEditJournal(entry)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn--small btn--danger"
                          onClick={() => handleDeleteJournal(entry._id)}
                          disabled={deletingJournalId === entry._id}
                        >
                          {deletingJournalId === entry._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default NewsPage;

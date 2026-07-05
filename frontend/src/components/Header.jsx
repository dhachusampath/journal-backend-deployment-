import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setMenuOpen(false);
    navigate("/auth");
  };

  const closeMenu = () => setMenuOpen(false);

  // Falls back to a self-contained initials avatar instead of a third-party
  // placeholder image service, which can go down or get blocked by ad-blockers.
  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase())
        .join("")
    : "?";

  const renderAvatar = () => {
    if (user?.profileImage) {
      const imageUrl = user.profileImage.startsWith("http")
        ? user.profileImage
        : `http://localhost:5000/uploads/${user.profileImage}`;

      return (
        <img src={imageUrl} alt={user.name} className="ledger-header-avatar" />
      );
    }

    return (
      <span className="ledger-header-avatar ledger-header-avatar--fallback">
        {initials}
      </span>
    );
  };

  return (
    <header className="ledger-header">
      <Link to="/" className="ledger-header-brand" onClick={closeMenu}>
        <span className="ledger-header-mark">⬢</span>
        <span className="ledger-header-name">The Daily Ledger</span>
      </Link>

      <nav
        className={menuOpen ? "ledger-header-nav active" : "ledger-header-nav"}
      >
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About
        </Link>
        <Link to="/newspage" onClick={closeMenu}>
          News
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>

        {!user ? (
          <div className="ledger-header-auth-mobile">
            <Link to="/auth" onClick={closeMenu}>
              <button className="ledger-header-login">Login</button>
            </Link>
            <Link to="/auth" onClick={closeMenu}>
              <button className="ledger-header-signup">Sign Up</button>
            </Link>
          </div>
        ) : (
          <div className="ledger-header-user-mobile">
            {renderAvatar()}
            <span className="ledger-header-username">{user.name}</span>
            <button className="ledger-header-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </nav>

      {!user ? (
        <div className="ledger-header-auth-desktop">
          <Link to="/auth">
            <button className="ledger-header-login">Login</button>
          </Link>
          <Link to="/auth">
            <button className="ledger-header-signup">Sign Up</button>
          </Link>
        </div>
      ) : (
        <div className="ledger-header-user-desktop">
          {renderAvatar()}
          <span className="ledger-header-username">{user.name}</span>
          <button className="ledger-header-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      <button
        className="ledger-header-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
}

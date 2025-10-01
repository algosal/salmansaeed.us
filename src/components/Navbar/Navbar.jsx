import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      {isMobile && (
        <div className="mobile-header">
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className={`bar bar1 ${menuOpen ? "open" : ""}`}></div>
            <div className={`bar bar2 ${menuOpen ? "open" : ""}`}></div>
            <div className={`bar bar3 ${menuOpen ? "open" : ""}`}></div>
          </button>
        </div>
      )}

      {!isMobile && (
        <ul className="nav-links sidebar">
          <li>
            <NavLink to="/" end>
              Meet Salman
            </NavLink>
          </li>
          <li>
            <NavLink to="/corporate">Corporate</NavLink>
          </li>
          <li>
            <NavLink to="/gallery">Gallery</NavLink>
          </li>
          <li>
            <NavLink to="/legacy">Legacy</NavLink>
          </li>
          <li>
            <NavLink to="/character">Character</NavLink>
          </li>
          <li>
            <NavLink to="/intelligence">Intelligence</NavLink>
          </li>
          <li>
            <NavLink to="/consciousness">Consciousness</NavLink>
          </li>
          <li>
            <NavLink to="/GraphNavPanel">Graphs</NavLink>
          </li>
        </ul>
      )}

      {isMobile && menuOpen && (
        <div className="mobile-modal">
          <ul className="nav-links modal-links">
            <li>
              <NavLink to="/" end onClick={toggleMenu}>
                Meet Salman
              </NavLink>
            </li>
            <li>
              <NavLink to="/corporate" onClick={toggleMenu}>
                Corporate
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" onClick={toggleMenu}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/legacy" onClick={toggleMenu}>
                Legacy
              </NavLink>
            </li>
            <li>
              <NavLink to="/character" onClick={toggleMenu}>
                Character
              </NavLink>
            </li>
            <li>
              <NavLink to="/intelligence" onClick={toggleMenu}>
                Intelligence
              </NavLink>
            </li>
            <li>
              <NavLink to="/consciousness" onClick={toggleMenu}>
                Consciousness
              </NavLink>
            </li>
            <li>
              <NavLink to="/GraphNavPanel" onClick={toggleMenu}>
                Graphs
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

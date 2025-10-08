import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle window resize
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
    <nav className="nav-wrapper">
      {/* Mobile Header with Hamburger */}
      {isMobile && (
        <div className="nav-mobile-header">
          <button
            className="nav-hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div
              className={
                menuOpen ? "nav-bar nav-bar1 open" : "nav-bar nav-bar1"
              }
            ></div>
            <div
              className={
                menuOpen ? "nav-bar nav-bar2 open" : "nav-bar nav-bar2"
              }
            ></div>
            <div
              className={
                menuOpen ? "nav-bar nav-bar3 open" : "nav-bar nav-bar3"
              }
            ></div>
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <ul className="nav-links nav-sidebar">
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

      {/* Mobile Modal Menu */}
      {isMobile && menuOpen && (
        <div className="nav-mobile-modal">
          <ul className="nav-links nav-modal-links">
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

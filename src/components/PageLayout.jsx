// components/PageLayout.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const PageLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "#eee",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const sidebarStyle = {
    display: isMobile ? "none" : "flex",
    flexDirection: "column",
    width: 220,
    padding: 20,
    backgroundColor: "#1e1e1e",
    gap: 15,
    boxSizing: "border-box",
    height: "100vh",
    position: "sticky",
    top: 0,
  };

  const linkStyle = {
    color: "#bbb",
    textDecoration: "none",
    fontSize: 18,
    fontWeight: 600,
    padding: "8px 12px",
    borderRadius: 6,
    marginBottom: 8,
    display: "inline-block",
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: "#00f0ff",
    backgroundColor: "#333",
  };

  const contentStyle = {
    flexGrow: 1,
    padding: 30,
    overflowY: "auto",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <nav style={sidebarStyle}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Meet Salman
        </NavLink>
        <NavLink
          to="/gallery"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Gallery
        </NavLink>
        <NavLink
          to="/corporate"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Corporate
        </NavLink>
        <NavLink
          to="/legacy"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Legacy
        </NavLink>
        <NavLink
          to="/character"
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Character
        </NavLink>
      </nav>
      {isMobile && <Navbar />}
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default PageLayout;

import React, { useMemo } from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { FaHome, FaUserAlt, FaFolder, FaEnvelope } from "react-icons/fa";
import { Link } from "react-scroll";
import DarkModeToggle from "./DarkModeToggle";
import jrzLogo from "../assets/images/jrzlogo.png";
import "../Navbar.css";

const PortfolioNavbar = ({ darkMode, setDarkMode }) => {
  // Memoize Nav Links to optimize performance
  const navLinks = useMemo(
    () => [
      { to: "home", icon: <FaHome />, label: "Home" },
      { to: "about", icon: <FaUserAlt />, label: "About Me" }, 
      { to: "certifications", icon: <FaUserAlt />, label: "Certifications" },
      { to: "projects", icon: <FaFolder />, label: "Projects" },
      { to: "contact", icon: <FaEnvelope />, label: "Contact Me" },
    ],
    []
  );

  return (
    <BootstrapNavbar
      expand="sm"
      bg={darkMode ? "dark" : "light"}
      variant={darkMode ? "dark" : "light"}
      fixed="top"
    >
      <Container fluid>
        <BootstrapNavbar.Brand href="#home">
          <img
            src={jrzLogo}
            alt="Portfolio Logo"
            style={{ width: "40px" }}
            className="rounded-pill"
          />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {navLinks.map((link) => (
              <Nav.Link
                as={Link}
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                className="nav-link"
              >
                {link.icon} {link.label}
              </Nav.Link>
            ))}
          </Nav>
          <div className="ms-auto">
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default PortfolioNavbar;

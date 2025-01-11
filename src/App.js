import React, { useState, useEffect, Suspense, lazy } from "react";
import PortfolioNavbar from "./components/Navbar";
import Hero from "./components/Hero";
import Certificates from "./components/Certificates";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import ContactMe from "./components/ContactMe";

// Lazy load components
const Projects = lazy(() => import("./components/Projects"));

const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Toggle dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    // document.documentElement.classList.toggle("dark-mode", darkMode); //Removed as per update instruction
  }, [darkMode]);

  // Scroll to top button visibility
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Simulate loading content
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000); // Simulated delay for loading
  }, []);

  return (
    <Router>
      <div className={darkMode ? 'dark-mode' : ''}>
        {/* Helmet for SEO */}
        <Helmet>
          <meta name="description" content="Jeruz Abiera's Portfolio" />
          <title>Jeruz Abiera - Frontend Developer</title>
        </Helmet>

        {/* Navbar */}
        <PortfolioNavbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Scroll to Top Button */}
        {visible && (
          <button
            onClick={() => window.scrollTo(0, 0)}
            className="scroll-to-top"
          >
            ↑
          </button>
        )}

        {/* Hero Section */}
        <section id="home">
          <Hero />
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <div className="container">
            <h2>About Me</h2>
            <p>Hello, I'm Jeruz Abiera, a passionate Frontend Developer skilled in HTML, CSS, JavaScript, and React. I love building creative and responsive web applications.</p>

            <h3>Work Experience</h3>
            <ul>
              <li><strong>Technical Support Engineer - 8x8 </strong> (November 07, 2022 - Present)
                <ul>
                  <li>In this role, I provide crucial support to clients by troubleshooting and resolving technical issues related to VOIP systems, softphones, and network configurations.</li>
                  <li>My expertise includes setting up desk phones from major providers like Cisco, Polycom, and Yealink, while ensuring compliance with technical requirements.</li>
                </ul>
              </li>
              <li><strong>Fraud Detection Analyst - Barclays Bank US</strong> (February 2022 - June 2022)
                <ul>
                  <li>As a Fraud Analyst at Barclays, I safeguarded customer accounts by analyzing and detecting suspicious activities.</li>
                  <li>My role required critical thinking, attention to detail, and fast decisionmaking, all of which helped prevent fraudulent transactions and protect both the bank and its clients from financial risk.</li>
                </ul>
              </li>
              <li><strong>Customer Assistance Advisor - 118118 Money</strong> (August 2021 - February 2022)
                <ul>
                  <li>As a Customer Assistance Advisor, I provided personalized support to customers, addressing a wide range of inquiries related to financial services.</li>
                  <li>My ability to quickly understand and resolve customer concerns helped build strong relationships and foster loyalty, all while meeting servicelevel agreements and performance targets.</li>
                </ul>
              </li>
              <li><strong>Collection Specialist - Ally Financial Bank</strong> (May 2017 - August 2021)
                <ul>
                  <li>In this role, I handled collections for auto finance accounts, contacting customers to arrange payments and negotiating successful outcomes.</li>
                  <li>I consistently met or exceeded monthly targets, demonstrating my ability to work under pressure and manage challenging situations, all while maintaining high levels of professionalism and customer satisfaction.</li>
                </ul>
              </li>
            </ul>

            <h3>Skills</h3>
            <ul>
              <li>Frontend Development: HTML, CSS, JavaScript, React, Tailwind CSS</li>
              <li>Version Control: Git, GitHub</li>
              <li>Tools: Visual Studio Code, Chrome DevTools</li>
              <li>Troubleshooting Skills</li>
              <li>Managing Ticketing System "Salesforce, Zendesk etc"</li>
              <li>Networking Basics</li>
              <li>Networking Devices and Initial Configuration</li>
            </ul>

            <h3>Education</h3>
            <p><strong>BS Computer Science</strong> - Laguna Science and Technology College (2018 - 2020)</p>
            <p><strong>Programming NCIV</strong> - Laguna Science and Technology College (2015 - 2017)</p>

            <h3>Contact</h3>
            <ul>
              <li>Email: jeruz.abiera@outlook.com</li>
              <li>Phone Number: +63 969-313-4738</li>
              <li>LinkedIn: <a href="https://www.linkedin.com/in/jeruzabiera">linkedin.com/in/jeruzabiera</a></li>
            </ul>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="section">
          <div className="container text-center">
            <h2>Certifications</h2>
            <Certificates />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section bg-light">
          <div className="container text-center">
            <h2>My Projects</h2>
            <Suspense fallback={<div>Loading Projects...</div>}>
              {isLoading ? <div>Loading...</div> : <Projects />}
            </Suspense>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="container text-center">
            <h2>Contact Me</h2>
            <ContactForm />
          </div>
        </section>

        {/* Footer */}
        <Footer />
        
      </div>
    </Router>
  );
};

export default App;


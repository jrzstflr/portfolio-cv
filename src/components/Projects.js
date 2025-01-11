import React, { useState } from "react";
import { Card, Button, Carousel, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import project1Image from "../assets/images/project1.JPG";
import project2Image from "../assets/images/project2.JPG";
import { FaInstagram, FaTiktok, FaFacebook, FaLinkedin } from "react-icons/fa"; // Corrected import
import "./Projects.css";

const projects = [
  {
    title: "Dog Rescue Website",
    description: "A website dedicated to rescuing dogs and facilitating adoptions.",
    image: project1Image,
    link: "https://doggo-website-sooty.vercel.app/",
    fullDescription: "This comprehensive dog rescue website serves as a platform for connecting rescued dogs with potential adopters. It features a user-friendly interface showcasing available dogs, their stories, and adoption procedures. The site also includes resources for dog care, a donation system, and a volunteer sign-up process.",
    technologies: ["React.js", "Firebase", "Chart.js", "Node.js"],
    completionDate: "October 2024",
  },
  {
    title: "Advanced Budget Tracker",
    description: "An advanced dashboard for tracking income and expenditures.",
    image: project2Image,
    link: "https://budget-tracker-2-vert.vercel.app/",
    fullDescription: "The Budget Tracker is a sophisticated financial management tool designed to help users monitor their income and expenses effectively. It offers features such as expense categorization, income tracking, budget setting, and visual representations of financial data through charts and graphs. The application also provides insights and suggestions for better financial management.",
    technologies: ["React", "Node.js"],
    completionDate: "November 2024",
  },
];

const PortfolioCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handleImageClick = (project) => {
    setSelectedProject(project);
    setShowImageModal(true);
  };

  const handleDetailsClick = (project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  const shareOnSocialMedia = (platform, projectLink) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${projectLink}`;
        break;
      case "instagram":
        shareUrl = `https://www.instagram.com/sharer/sharer.php?u=${projectLink}`;
        break;
      case "tiktok":
        shareUrl = `https://www.tiktok.com/share?url=${projectLink}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${projectLink}&title=Project&summary=Check out this amazing project!`;
        break;
      default:
        break;
    }
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="portfolio-carousel-container">
      <Carousel activeIndex={activeIndex} onSelect={handleSelect} interval={null}>
        {projects.map((project, index) => (
          <Carousel.Item key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="project-card shadow-lg hover-scale">
                <div className="image-container">
                  <Card.Img
                    variant="top"
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="image-overlay">
                    <Button 
                      variant="light" 
                      onClick={() => handleImageClick(project)}
                    >
                      View Project
                    </Button>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text>{project.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleDetailsClick(project)}
                    className="view-details-button"
                  >
                    <span className="d-none d-sm-inline">View Details</span>
                    <span className="d-inline d-sm-none">View</span>
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="social-share-buttons">
        <Button
          variant="outline-primary"
          className="social-share-button"
          onClick={() => shareOnSocialMedia("instagram", selectedProject?.link)}
        >
          <FaInstagram size={17} />
        </Button>
        <Button
          variant="outline-primary"
          className="social-share-button"
          onClick={() => shareOnSocialMedia("tiktok", selectedProject?.link)}
        >
          <FaTiktok size={17} />
        </Button>
        <Button
          variant="outline-primary"
          className="social-share-button"
          onClick={() => shareOnSocialMedia("facebook", selectedProject?.link)}
        >
          <FaFacebook size={17} />
        </Button>
        <Button
          variant="outline-primary"
          className="social-share-button"
          onClick={() => shareOnSocialMedia("linkedin", selectedProject?.link)}
        >
          <FaLinkedin size={17} />
        </Button>
      </div>

      <div className="carousel-indicators custom">
        {projects.map((_, index) => (
          <Button
            key={index}
            variant={index === activeIndex ? "primary" : "outline-primary"}
            onClick={() => handleSelect(index)}
            className="mx-1"
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedProject?.image} alt={selectedProject?.title} className="img-fluid" />
        </Modal.Body>
      </Modal>

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedProject?.image} alt={selectedProject?.title} className="img-fluid mb-3" />
          <h5>Description</h5>
          <p>{selectedProject?.fullDescription}</p>
          <h5>Technologies Used</h5>
          <ul>
            {selectedProject?.technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
          <p><strong>Completed:</strong> {selectedProject?.completionDate}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          <Button variant="primary" href={selectedProject?.link} target="_blank" rel="noopener noreferrer">
            Visit Project
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PortfolioCarousel;

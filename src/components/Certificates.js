import React, { useState } from "react";
import { Card, Button, Modal, Carousel, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaFacebook, FaLinkedin } from "react-icons/fa"; // Import icons
import cert1Image from "../assets/images/cert1.jpg";
import cert2Image from "../assets/images/cert2.jpg";
import "./Projects.css";

const certificates = [
  {
    title: "Networking Basics",
    description: "Comprehensive course covering the fundamentals of computer networking",
    image: cert1Image,
    link: "https://www.credly.com/badges/0e31bd06-ee89-41fe-bf59-f41e45d8ea39/linked_in_profile",
    issuer: "Cisco Networking Academy",
    date: "October 28, 2024",
    skills: ["Network Protocols", "IP Addressing", "Subnetting", "OSI Model"],
  },
  {
    title: "Networking Devices and Initial Configuration",
    description: "In-depth study of advanced networking concepts and technologies",
    image: cert2Image,
    link: "https://www.credly.com/badges/1f943c4f-a52e-4ee1-a489-1a10094cec0b/linked_in_profile",
    issuer: "Cisco Networking Academy",
    date: "November 26, 2024",
    skills: ["Network Security", "Wireless Networks", "Cloud Networking", "Network Troubleshooting"],
  },
];

const CertificateCarousel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (certificate) => {
    setSelectedCertificate(certificate);
    setShowImageModal(true);
  };

  const handleDetailsClick = (certificate) => {
    setSelectedCertificate(certificate);
    setShowDetailsModal(true);
  };

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const filteredCertificates = certificates.filter((certificate) =>
    certificate.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // shareOnSocialMedia function
  const shareOnSocialMedia = (platform, certificateLink) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${certificateLink}`;
        break;
      case "instagram":
        shareUrl = `https://www.instagram.com/sharer/sharer.php?u=${certificateLink}`;
        break;
      case "tiktok":
        shareUrl = `https://www.tiktok.com/share?url=${certificateLink}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${certificateLink}&title=Certificate&summary=Check out this amazing certificate!`;
        break;
      default:
        break;
    }
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="certificates-container">
      {/* Search Bar */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search Certificates"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>

      {/* Carousel */}
      <Carousel activeIndex={activeIndex} onSelect={handleSelect} interval={null}>
        {filteredCertificates.map((certificate, index) => (
          <Carousel.Item key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="certificate-card">
                <div className="image-container">
                  <Card.Img
                    variant="top"
                    src={certificate.image}
                    alt={certificate.title}
                    className="certificate-image"
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <Button
                      variant="light"
                      onClick={() => handleImageClick(certificate)}
                    >
                      View Certificate
                    </Button>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title>{certificate.title}</Card.Title>
                  <Card.Text>{certificate.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleDetailsClick(certificate)}
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

      {/* Social Media Share Buttons */}
      <div className="social-share-buttons mt-4">
        <Button
          variant="outline-primary"
          onClick={() => shareOnSocialMedia("instagram", certificates[activeIndex].link)}
          className="social-button"
        >
          <FaInstagram className="social-icon" />
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => shareOnSocialMedia("tiktok", certificates[activeIndex].link)}
          className="social-button"
        >
          <FaTiktok className="social-icon" />
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => shareOnSocialMedia("facebook", certificates[activeIndex].link)}
          className="social-button"
        >
          <FaFacebook className="social-icon" />
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => shareOnSocialMedia("linkedin", certificates[activeIndex].link)}
          className="social-button"
        >
          <FaLinkedin className="social-icon" />
        </Button>
      </div>

      {/* Custom Indicators */}
      <div className="carousel-indicators custom">
        {filteredCertificates.map((_, index) => (
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

      {/* Image Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCertificate?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedCertificate?.image} alt={selectedCertificate?.title} className="img-fluid" />
        </Modal.Body>
      </Modal>

      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCertificate?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedCertificate?.image} alt={selectedCertificate?.title} className="img-fluid mb-3" />
          <h5>Description</h5>
          <p>{selectedCertificate?.description}</p>
          <h5>Issuer</h5>
          <p>{selectedCertificate?.issuer}</p>
          <h5>Date Issued</h5>
          <p>{selectedCertificate?.date}</p>
          <h5>Skills Acquired</h5>
          <ul>
            {selectedCertificate?.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          <Button variant="primary" href={selectedCertificate?.link} target="_blank" rel="noopener noreferrer">
            Verify Certificate
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CertificateCarousel;

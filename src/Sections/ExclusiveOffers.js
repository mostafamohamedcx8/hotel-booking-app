import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import OfferCard from "../components/OfferCard";

const offersData = [
  {
    discount: "25%",
    title: "Summer Escape Package",
    description: "Enjoy a complimentary night and daily breakfast",
    expiry: "Aug 31",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdSpEC81LRtJXptzNTHkVM5SejvWfslh4PS1vNpqvN5aHOlsUgi2whEaQ&s",
  },
  {
    discount: "20%",
    title: "Romantic Getaway",
    description: "Special couples package including spa treatment",
    expiry: "Sep 5",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdSpEC81LRtJXptzNTHkVM5SejvWfslh4PS1vNpqvN5aHOlsUgi2whEaQ&s",
  },
  {
    discount: "20%",
    title: "Early Bird Special",
    description: "Book 60 days in advance and save",
    expiry: "Aug 31",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdSpEC81LRtJXptzNTHkVM5SejvWfslh4PS1vNpqvN5aHOlsUgi2whEaQ&s",
  },
];

const ExclusiveOffers = () => {
  return (
    <section
      className="exclusive-section"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
    >
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2
              className="section-title "
              style={{ fontFamily: "Times New Roman" }}
            >
              Exclusive Offers
            </h2>
            <p
              className="section-subtitle"
              style={{ fontFamily: "Times New Roman" }}
            >
              Take advantage of our limited-time offers and special packages to
              enhance your stay.
            </p>
          </div>
          <a href="#" className="view-all-link">
            View All Offers →
          </a>
        </div>
        <Row>
          {offersData.map((offer, idx) => (
            <Col key={idx} md={4} className="mb-4">
              <OfferCard {...offer} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ExclusiveOffers;

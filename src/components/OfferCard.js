import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const OfferCard = ({ discount, title, description, expiry, image }) => {
  return (
    <Card
      className="offer-card"
      style={{
        border: "none",
        borderRadius: "12px",
        overflow: "hidden",
        color: "#fff",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "240px",
        position: "relative",
      }}
    >
      <div className="overlay" />

      <div style={{ position: "absolute", top: "15px", left: "15px" }}>
        <Badge bg="light" text="dark" style={{ fontWeight: "bold" }}>
          {discount} OFF
        </Badge>
      </div>

      <Card.Body style={{ zIndex: 2, position: "absolute", bottom: "15px" }}>
        <Card.Title
          style={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            fontFamily: "Times New Roman",
          }}
        >
          {title}
        </Card.Title>
        <Card.Text style={{ fontSize: "0.9rem", fontFamily: "Serif" }}>
          {description}
        </Card.Text>
        <small style={{ display: "block", marginBottom: "8px" }}>
          Expires {expiry}
        </small>
        <Button variant="light" size="sm">
          View Offers →
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OfferCard;

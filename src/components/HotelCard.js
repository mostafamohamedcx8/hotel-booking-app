import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HotelCard = ({ image, title, location, price, rating, label, id }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/hoteldetails/${id}`);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.warning("Please log in to view all destinations.");
    }
  };
  return (
    <Card
      onClick={handleCardClick}
      style={{
        border: "none",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative" }}>
        <Card.Img
          variant="top"
          src={image}
          style={{ height: "200px", objectFit: "cover" }}
        />
        {label && (
          <Badge
            bg="dark"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              borderRadius: "12px",
              padding: "6px 12px",
              fontSize: "0.75rem",
            }}
          >
            {label}
          </Badge>
        )}
      </div>
      <Card.Body>
        <Card.Title style={{ fontWeight: "bold", fontFamily: "tahoma" }}>
          {title}
        </Card.Title>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center">
            <FaMapMarkerAlt style={{ marginLeft: "2px", color: "#777" }} />
            <Card.Text style={{ color: "#777", fontSize: "1rem", margin: 0 }}>
              {location}
            </Card.Text>
          </div>
          <div className="d-flex align-items-center" style={{ gap: "4px" }}>
            <span
              style={{
                color: "#F39C12",
                fontWeight: "bold",
                marginLeft: "4px",
              }}
            >
              {rating}
            </span>
            <i className="bi bi-star-fill" style={{ color: "#F39C12" }}></i>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span style={{ fontWeight: "bold" }}>
            ${price}{" "}
            <span style={{ fontSize: "0.8rem", color: "#888" }}>/ night</span>
          </span>
          <Button
            variant="light"
            style={{ borderRadius: "20px", fontWeight: "bold" }}
          >
            Book Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HotelCard;

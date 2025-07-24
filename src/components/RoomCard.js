import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RoomCard = ({
  image,
  title,
  address,
  rating = 4,
  reviews = "100+",
  location,
  price,
  amenities = [],
  id,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/hoteldetails/${id}`);
  };

  return (
    <Card
      style={{
        maxWidth: "750px",
        height: "250px",
        marginBottom: "30px",
        border: "none",
        backgroundColor: "#f3f4f5ff",
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <Row className="g-0 h-100">
        <Col md={4}>
          <div
            style={{
              height: "100%",
              width: "100%",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              overflow: "hidden",
              borderRadius: "10px",
            }}
          >
            <Card.Img
              src={image}
              style={{
                height: "100%",
                objectFit: "cover",
                width: "100%",
              }}
            />
          </div>
        </Col>
        <Col md={8}>
          <Card.Body className="d-flex flex-column justify-content-between h-100">
            <div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#888",
                  marginBottom: "10px",
                }}
              >
                {address || "Not Available"}
              </div>
              <Card.Title
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  fontFamily: "Times New Roman",
                  margin: "10px 0",
                }}
              >
                {title || "Unnamed Room"}
              </Card.Title>

              <div style={{ color: "#f5a623", fontSize: "0.9rem" }}>
                {[...Array(rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
                <span style={{ color: "#444", marginLeft: "8px" }}>
                  {reviews} Reviews
                </span>
              </div>

              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#777",
                  marginTop: "5px",
                }}
              >
                <FaMapMarkerAlt /> {location || "Not Available"}
              </div>

              <div style={{ marginTop: "10px" }}>
                {amenities.length > 0 ? (
                  amenities.map((amenity, index) => (
                    <Badge
                      key={index}
                      bg="light"
                      text="dark"
                      className="me-2 border"
                    >
                      {amenity}
                    </Badge>
                  ))
                ) : (
                  <Badge bg="light" text="dark" className="border">
                    No Amenities
                  </Badge>
                )}
              </div>
            </div>

            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              ${price || "Not Available"}{" "}
              <span style={{ fontSize: "1rem", color: "#555" }}>/day</span>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default RoomCard;

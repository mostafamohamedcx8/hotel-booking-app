import React from "react";

const TestimonialCard = ({ image, name, location, rating, text }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ color: i <= rating ? "#f4b400" : "#ddd", fontSize: "18px" }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      className="card shadow-sm border-0"
      style={{
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        textAlign: "left",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "15px",
          }}
        />
        <div>
          <h6 style={{ margin: 0 }}>{name}</h6>
          <p style={{ color: "gray", fontSize: "0.9rem", margin: 0 }}>
            {location}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "10px" }}>{renderStars()}</div>

      <p style={{ fontSize: "0.95rem", color: "#555" }}>{text}</p>
    </div>
  );
};

export default TestimonialCard;

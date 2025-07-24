import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const handleSearch = () => {
    if (destination.trim()) {
      navigate(`/rooms?city=${encodeURIComponent(destination.trim())}`);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url("/Hero.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "85vh",
        position: "relative",
        color: "white",
        display: "flex",
        alignItems: "left",
        justifyContent: "left",
        padding: "0 20px",
        paddingTop: "150px",
      }}
    >
      {/* Overlay Dark Layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      ></div>

      <div
        style={{
          zIndex: 2,
          textAlign: "left",
          maxWidth: "800px",
          marginLeft: "40px",
        }}
      >
        <span
          style={{
            backgroundColor: "rgba(60, 145, 230, 0.3)", // نفس اللون لكن شفاف بنسبة 30%
            padding: "5px 15px",
            borderRadius: "20px",
            fontSize: "14px",
            display: "inline-block",
            marginBottom: "15px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          The Ultimate Hotel Experience
        </span>
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "20px",
            maxWidth: "500px",
            whiteSpace: "normal",
            lineHeight: "1.1",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            fontFamily: "Times New Roman",
          }}
        >
          Discover Your Perfect Getaway Destination
        </h1>

        <p
          style={{
            fontSize: "18px",
            marginBottom: "30px",
            maxWidth: "500px",
            whiteSpace: "normal",
            lineHeight: "1.3",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            fontFamily: "Times New Roman",
          }}
        >
          Unparalleled luxury and comfort await at the world's most exclusive
          hotels and resorts. Start your journey today.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;

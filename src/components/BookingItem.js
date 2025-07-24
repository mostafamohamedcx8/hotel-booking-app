// BookingItem.jsx
import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCheckoutSession } from "../services/bookingService";
const BookingItem = ({ hotel }) => {
  const handlePayment = async () => {
    try {
      const response = await getCheckoutSession(hotel.id);
      const session = response.session;
      console.log(response);

      window.location.href = session.url;
    } catch (error) {
      toast.error("Failed to initiate payment");
      console.error(error);
    }
  };
  return (
    <Row className="mb-4 pb-3 border-bottom" style={{ alignItems: "center" }}>
      {/* صورة الفندق */}
      <Col md={5} className="d-flex">
        <Image
          src={hotel.image}
          rounded
          width={140}
          height={110}
          style={{ objectFit: "cover", marginRight: "15px" }}
        />
        <div style={{}}>
          <div style={{ fontWeight: "bold", fontFamily: "Time New Roman" }}>
            {hotel.name}{" "}
            <span style={{ fontWeight: "normal", fontSize: "12px" }}>
              ({hotel.roomType})
            </span>
          </div>
          <div style={{ fontSize: "13px", color: "#555" }}>
            <FaMapMarkerAlt
              style={{ marginRight: "10px", color: "#c4bebec9" }}
            />
            {hotel.city} {hotel.address}
          </div>
          <div style={{ fontSize: "13px", color: "#555" }}>
            <FaUser style={{ marginRight: "10px", color: "#c4bebec9" }} />{" "}
            Guests: {hotel.guests}
          </div>
          <div
            style={{ fontSize: "14px", fontWeight: "bold", marginTop: "4px" }}
          >
            Total: ${hotel.total}
          </div>
        </div>
      </Col>

      {/* Check-in & out */}
      <Col md={4} className="d-flex justify-content-between mb-3">
        <div>
          <strong style={{ display: "block" }}>Check-in:</strong>{" "}
          <span style={{ color: "#555" }}>{hotel.checkIn}</span>
        </div>
        <div>
          <strong style={{ display: "block" }}>Check-out:</strong>{" "}
          <span style={{ color: "#555" }}>{hotel.checkOut}</span>
        </div>
      </Col>

      {/* الدفع */}
      <Col md={3} className="text-md-end mt-3 mt-md-0">
        <div>
          {hotel.payment === "Paid" ? (
            <span
              style={{
                color: "green",
                fontWeight: "bold",
                display: "inline-flex",
                alignItems: "center",
                marginRight: "13px",
              }}
            >
              ● Paid
            </span>
          ) : (
            <>
              <span
                style={{
                  color: "red",
                  fontWeight: "bold",
                  display: "inline-flex",
                  alignItems: "center",
                  marginRight: "10px",
                  display: "block",
                  marginBottom: "10PX",
                }}
              >
                ● Unpaid
              </span>
              <Button
                variant="outline-dark"
                onClick={handlePayment}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                  fontWeight: "500",
                }}
              >
                Pay now
              </Button>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default BookingItem;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSpecificRoom } from "../services/roomService";
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  Form,
  Image,
} from "react-bootstrap";

import {
  FaMapMarkerAlt,
  FaBroom,
  FaWifi,
  FaUtensils,
  FaConciergeBell,
  FaShieldAlt,
  FaStar,
  FaDoorOpen,
} from "react-icons/fa";

import { checkAvailabilityAPI, bookRoomAPI } from "../services/bookingService";

const HotelDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [guests, setGuests] = useState(2);

  const handleCheckAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      return toast.error("Please select both check-in and check-out dates");
    }

    try {
      const res = await checkAvailabilityAPI({
        room: id,
        checkInDate,
        checkOutDate,
      });

      setIsAvailable(res.isAvailable);

      if (res.isAvailable) {
        toast.success("🎉 Room is available!");
      } else {
        toast.warning("❌ Room is not available for the selected dates.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while checking availability");
    }
  };
  const handleBookRoom = async () => {
    if (!checkInDate || !checkOutDate) {
      return toast.error("Please select both check-in and check-out dates");
    }

    try {
      const bookingData = {
        room: id,
        hotel: room.hotel._id,
        checkInDate,
        checkOutDate,
        guests,
      };

      const res = await bookRoomAPI(bookingData);
      navigate("/mybooking");

      toast.success("✅ Booking confirmed!");
      // ممكن تحول لصفحة تأكيد أو تعمل أي إجراء إضافي هنا
    } catch (err) {
      console.error(err);
      toast.error("❌ Booking failed. Please try again.");
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await getSpecificRoom(id); // 2. استدعاء الـ API
        setRoom(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching room details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!room) return <div>Room not found</div>;
  return (
    <Container style={{ padding: "30px 10px", marginTop: "80px" }}>
      <Row className="mb-3">
        <Col>
          <h4
            style={{
              fontWeight: "bold",
              display: "inline-block",
              marginRight: "10px",
              fontFamily: "Times New Roman",
            }}
          >
            {room.hotel.name}{" "}
            <span style={{ fontSize: "14px", fontWeight: "normal" }}>
              ({room.roomType})
            </span>
          </h4>
          <Badge
            bg="warning"
            text="dark"
            style={{ marginLeft: "10px", fontSize: "12px" }}
          >
            20% OFF
          </Badge>
          <div style={{ marginTop: "5px", color: "#777" }}>
            <FaStar style={{ color: "#f5a623", marginRight: "5px" }} />
            <FaStar style={{ color: "#f5a623", marginRight: "5px" }} />
            <FaStar style={{ color: "#f5a623", marginRight: "5px" }} />
            <FaStar style={{ color: "#f5a623", marginRight: "5px" }} />
            <FaStar style={{ color: "#ccc", marginRight: "5px" }} />
            <span style={{ fontSize: "14px" }}>200+ reviews</span>
          </div>
          <div style={{ color: "#888", marginTop: "5px", fontSize: "14px" }}>
            <FaMapMarkerAlt style={{ marginRight: "5px" }} />
            {room.hotel.city}, {room.hotel.address}
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        {/* الصورة الرئيسية */}
        <Col md={6} className="mb-3 mb-md-0">
          <img
            src={room.images[0]}
            alt="Main Room"
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "260px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </Col>

        {/* الصور المصغرة */}
        <Col md={6}>
          <Row className="g-3">
            {room.images.slice(1).map((img, i) => (
              <Col xs={6} key={i}>
                <img
                  src={img}
                  alt={`Room ${i}`}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <h5
            style={{
              fontWeight: "bold",
              fontFamily: "Times New Roman",
              fontSize: "25px",
            }}
          >
            Experience Luxury Like Never Before
          </h5>
          <div
            style={{
              marginTop: "15px",
              display: "flex",
              gap: "20px",
              fontSize: "14px",
            }}
          >
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                gap: "20px",
                fontSize: "14px",
                flexWrap: "wrap",
              }}
            >
              {room.animties.map((item, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col md={4} className="text-md-end text-start mt-3 mt-md-0">
          <h4 style={{ fontWeight: "bold", color: "#333" }}>
            ${room.pricePerNight}{" "}
            <span style={{ fontSize: "16px", color: "#666" }}>/ night</span>
          </h4>
        </Col>
      </Row>
      <div
        style={{
          width: "600px",
          height: "1px",
          backgroundColor: "#ebe6e6d3",
          content: "left",
          marginBottom: "32px",
        }}
      ></div>
      <Row
        className="shadow-sm p-3 mb-4 bg-white rounded"
        style={{
          borderRadius: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Col md={3} xs={12} className="mb-2 mb-md-0">
          <Form.Label style={{ fontWeight: "bold", fontSize: "14px" }}>
            Check-In
          </Form.Label>
          <Form.Control
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </Col>

        <Col md={3} xs={12} className="mb-2 mb-md-0">
          <Form.Label style={{ fontWeight: "bold", fontSize: "14px" }}>
            Check-Out
          </Form.Label>

          <Form.Control
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </Col>

        <Col md={3} xs={12} className="mb-2 mb-md-0">
          <Form.Label style={{ fontWeight: "bold", fontSize: "14px" }}>
            Guests
          </Form.Label>
          <Form.Select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          >
            <option value={1}>1 guest</option>
            <option value={2}>2 guests</option>
            <option value={3}>3 guests</option>
            <option value={4}>4+ guests</option>
          </Form.Select>
        </Col>

        <Col md={3} xs={12}>
          <Button
            style={{
              backgroundColor: isAvailable ? "green" : "#007bff",
              width: "100%",
              padding: "10px 20px",
              fontWeight: "bold",
              border: "none",
              marginTop: "28px",
            }}
            onClick={isAvailable ? handleBookRoom : handleCheckAvailability}
          >
            {isAvailable ? "Book Now" : "Check Availability"}
          </Button>
        </Col>
      </Row>

      {/* المميزات */}
      <div>
        {[
          {
            icon: <FaBroom />,
            title: "Clean Room",
            desc: "We'll ensure the clean room for you.",
          },
          {
            icon: <FaShieldAlt />,
            title: "Enhanced Clean",
            desc: "This host has committed to Stayzy's cleaning process.",
          },
          {
            icon: <FaMapMarkerAlt />,
            title: "Great location",
            desc: "90% of recent guests gave the location a 5-star rating.",
          },
          {
            icon: <FaDoorOpen />,
            title: "Great check-in experience",
            desc: "100% of recent guests gave the check-in process a 5-star rating.",
          },
        ].map((item, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              {item.icon} {item.title}
            </div>
            <div
              style={{ fontSize: "14px", color: "#555", marginLeft: "26px" }}
            >
              {item.desc}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          width: "600px",
          height: "1px",
          backgroundColor: "#ebe6e6d3",
          content: "left",
          marginBottom: "20px",
        }}
      ></div>

      {/* النص السفلي */}
      <div
        style={{
          fontSize: "13px",
          color: "#888",
          marginTop: "20px",
          lineHeight: "1.6",
        }}
      >
        Guests will be allocated on the ground floor according to availability.
        You get a comfortable two bedroom apartment that has a nice city
        feeling. The price includes cost for the space, all recent updates made.
        You’ll be required to sign the rental price for short stay. The guests
        will be allocated ground floor according to availability. You get the
        comfortable two bedroom apartment that has a nice city feeling.
      </div>
      <div
        style={{
          width: "600px",
          height: "1px",
          backgroundColor: "#ebe6e6d3",
          content: "left",
          marginBottom: "20px",
          marginTop: "15px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* الصورة + النص */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="https://img.freepik.com/free-vector/editable-hotel-logo-vector-business-corporate-identity-hostel_53876-111553.jpg"
            roundedCircle
            width="50"
            height="50"
            style={{ marginRight: "15px", objectFit: "cover" }}
          />

          <div>
            <div style={{ fontWeight: "bold", fontSize: "16px" }}>
              Hosted by Urbanza Suites
            </div>
            <div style={{ marginTop: "4px" }}>
              <span style={{ color: "#ff9529", fontSize: "16px" }}>
                ★ ★ ★ ★ ★
              </span>
              <span
                style={{ marginLeft: "8px", color: "#666", fontSize: "14px" }}
              >
                200+ reviews
              </span>
            </div>
          </div>
        </div>

        {/* الزر */}
        <Button
          variant="primary"
          style={{
            padding: "8px 20px",
            fontWeight: "500",
            borderRadius: "6px",
          }}
        >
          Contact Now
        </Button>
      </div>
    </Container>
  );
};

export default HotelDetails;

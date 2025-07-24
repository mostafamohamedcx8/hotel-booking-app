// pages/FeaturedHotels.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import HotelCard from "../components/HotelCard";
import { getAllRooms } from "../services/roomService";
import { toast } from "react-toastify";
const FeaturedHotels = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await getAllRooms();
        setRooms(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <section style={{ background: "#f8f9fa", padding: "60px 0" }}>
      <Container>
        <div className="text-center mb-5">
          <h2 style={{ fontWeight: "bold", fontFamily: "Times New Roman" }}>
            Featured Hotels
          </h2>
          <p
            style={{
              color: "#777",
              maxWidth: "600px",
              margin: "0 auto",
              fontFamily: "Times New Roman",
            }}
          >
            Discover our handpicked selection of exceptional properties around
            the world, offering unparalleled luxury and unforgettable
            experiences.
          </p>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            {rooms.map((room, idx) => (
              <Col md={6} lg={3} key={room._id} className="mb-4">
                <HotelCard
                  image={room.images?.[0]}
                  title={room.roomType}
                  location={room.hotel?.city}
                  price={room.pricePerNight}
                  label={room.animties?.[0]}
                  rating={Math.floor(Math.random() * 2) + 4}
                  id={room?._id}
                />
                {console.log(room.images?.[0])}
              </Col>
            ))}
          </Row>
        )}

        <div className="text-center mt-4">
          <Button
            variant="dark"
            style={{ borderRadius: "30px", padding: "10px 30px" }}
            onClick={() => {
              const token = localStorage.getItem("token");
              if (token) {
                window.location.href = "/rooms";
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
                toast.warning("Please log in to view all destinations.", {
                  position: "top-center",
                  autoClose: 3000,
                });
              }
            }}
          >
            View All Destinations
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedHotels;

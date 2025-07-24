import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import RoomCard from "../components/RoomCard";
import RoomFilters from "../components/RoomFilters";
import { getAllRoom } from "../services/roomService";
import { useLocation } from "react-router-dom";

export const AllRoom = () => {
  const location = useLocation();
  const defaultFilters = { limit: 15 };
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(defaultFilters);

  // Fetch rooms based on filters
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await getAllRoom(filters);
      setRooms(response.data); // Assuming response.data is the rooms array
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
      toast.error("No rooms with this filter. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [filters]);

  // Handle filter changes from RoomFilters
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ marginTop: 80, backgroundColor: "#f3f4f5ff" }}>
      <Container style={{ paddingTop: 30 }}>
        <h1
          className="text-left"
          style={{
            fontWeight: "bold",
            fontSize: "2.5rem",
            fontFamily: "Times New Roman",
          }}
        >
          Hotel Rooms
        </h1>
        <p
          className="text-left"
          style={{ color: "#666", whiteSpace: "pre-wrap", maxWidth: "600px" }}
        >
          Take advantage of our limited-time offers and special packages to
          enhance your stay and create unforgettable memories.
        </p>

        <Row className="mt-3">
          <Col md={9}>
            {rooms.length === 0 ? (
              <p>No rooms available for your criteria.</p>
            ) : (
              rooms.map((room, index) => (
                <div key={room._id}>
                  <RoomCard
                    id={room._id}
                    image={room.images[0]}
                    title={room.hotel.name}
                    address={room.hotel.address}
                    rating={room.rating || 4}
                    reviews={room.reviews || "100+"}
                    location={room.hotel.city}
                    price={room.pricePerNight}
                    amenities={room.animties} // Fixed typo: animties -> amenities
                  />
                  {index < rooms.length - 1 && (
                    <div
                      style={{
                        width: "600px",
                        height: "1px",
                        backgroundColor: "#888",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        marginBottom: "20px",
                      }}
                    ></div>
                  )}
                </div>
              ))
            )}
          </Col>
          <Col md={3}>
            <RoomFilters onFilterChange={handleFilterChange} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AllRoom;

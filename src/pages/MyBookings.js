// MyBookings.jsx
import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import BookingItem from "../components/BookingItem";
import { getMyBookings } from "../services/bookingService";
import { toast } from "react-toastify";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getMyBookings();
        const formattedBookings = res.data.map((item) => ({
          id: item._id,
          name: item.hotel.name,
          roomType: item.room.roomType,
          city: item.hotel.city,
          address: item.hotel.address,
          guests: item.guests,
          total: item.totalPrice,
          checkIn: new Date(item.checkInDate).toLocaleDateString(),
          checkOut: new Date(item.checkOutDate).toLocaleDateString(),
          payment: item.ispaid ? "Paid" : "Unpaid",
          image: item.room.images[0],
        }));
        setBookings(formattedBookings);
      } catch (error) {
        toast.error("Failed to fetch your bookings");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Container className="mt-5">
      <div style={{ marginTop: "100px" }}>
        <h4 style={{ fontWeight: "bold", fontFamily: "Times New Roman" }}>
          My Bookings
        </h4>
        <p
          style={{
            color: "#666",
            fontFamily: "Times New Roman",
            maxWidth: "530px",
          }}
        >
          Easily manage your past, current, and upcoming hotel reservations in
          one place. Plan your trips seamlessly with just a few clicks.
        </p>
        <hr />
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((hotel, idx) => <BookingItem key={idx} hotel={hotel} />)
        )}
      </div>
    </Container>
  );
};

export default MyBookings;

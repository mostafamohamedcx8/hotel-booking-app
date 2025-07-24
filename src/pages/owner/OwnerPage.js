import React, { useEffect, useState } from "react";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
import { Badge, Col, Card, Table, Row } from "react-bootstrap";
import { getBookingsByHotel } from "../../services/bookingService";
import { getMyHotels } from "../../services/hotelService";
const OwnerPage = () => {
  const [bookings, setBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [hotelId, setHotelId] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await getMyHotels();
        if (res.data.length > 0) {
          setHotelId(res.data[0]._id);
          console.log(res.data[0]._id);
        }
      } catch (err) {
        console.error("❌ Error fetching hotel", err);
      }
    };
    fetchHotel();
  }, []);

  // ✅ جلب الحجوزات بناءً على الفندق
  useEffect(() => {
    if (!hotelId) return;
    const fetchBookings = async () => {
      try {
        const res = await getBookingsByHotel(hotelId);
        setBookings(res.data);
        setTotalBookings(res.totalBookings);
        setTotalRevenue(res.totalRevenue);
        console.log(res.data);
      } catch (err) {
        console.error("❌ Error fetching bookings", err);
      }
    };
    fetchBookings();
  }, [hotelId]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <OwnerSidebar />

      {/* Main Content */}
      <div style={{ marginLeft: "20px", padding: "20px", width: "100%" }}>
        <div style={{ padding: "30px" }}>
          <h2 style={{ fontWeight: "bold", fontFamily: "Time New Roman" }}>
            Dashboard
          </h2>
          <p
            style={{
              color: "#666",
              fontSize: "14px",
              marginBottom: "25px",
              maxWidth: "520px",
            }}
          >
            Monitor your room listings, track bookings and analyze revenue—all
            in one place. Stay updated with real-time insights to ensure smooth
            operations.
          </p>

          {/* Cards Section */}
          <Row style={{ marginBottom: "30px" }}>
            <Col md={3}>
              <Card
                style={{
                  padding: "20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  border: "none",
                  textAlign: "center",
                }}
              >
                <h5>Total Bookings</h5>
                <p style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
                  {totalBookings}
                </p>
              </Card>
            </Col>
            <Col md={3}>
              <Card
                style={{
                  padding: "20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  border: "none",
                  textAlign: "center",
                }}
              >
                <h5>Total Revenue</h5>
                <p style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
                  ${totalRevenue}
                </p>
              </Card>
            </Col>
          </Row>

          {/* Recent Bookings */}
          <h5 style={{ marginBottom: "15px" }}>Recent Bookings</h5>
          <div style={{ overflowX: "auto" }}>
            <Table hover bordered style={{ background: "white" }}>
              <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th style={{ fontFamily: "Time New Roman" }}>User Name</th>
                  <th style={{ fontFamily: "Time New Roman" }}>Room Name</th>
                  <th style={{ fontFamily: "Time New Roman" }}>Total Amount</th>
                  <th style={{ fontFamily: "Time New Roman" }}>
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.user?.username || "N/A"}</td>
                      <td>{booking.room?.roomType}</td>
                      <td>${booking.room?.pricePerNight}</td>
                      <td>
                        {booking.ispaid ? (
                          <Badge bg="success">Paid</Badge>
                        ) : (
                          <Badge bg="warning" text="dark">
                            Pending
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OwnerPage;

// RoomListings.js
import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
import {
  getRoomsByHotel,
  toggleRoomAvailability,
} from "../../services/roomService";
import { getMyHotels } from "../../services/hotelService";
import { toast } from "react-toastify";
const RoomListings = () => {
  const [hotelId, setHotelId] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchHotelId = async () => {
      try {
        const res = await getMyHotels();
        if (res.data.length > 0) {
          const id = res.data[0]._id;
          setHotelId(id);
          console.log("✅ Hotel ID:", id);
        } else {
          console.warn("⚠️ No hotels found");
        }
      } catch (err) {
        console.error("❌ Error fetching hotel:", err);
      }
    };
    fetchHotelId();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!hotelId) return;
      try {
        const res = await getRoomsByHotel(hotelId);
        setRooms(res.data); // rooms راجعة من السيرفر
        console.log("✅ Rooms fetched:", res.data);
      } catch (err) {
        console.error("❌ Error fetching rooms:", err);
      }
    };
    fetchRooms();
  }, [hotelId]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <OwnerSidebar />

      <div style={{ marginLeft: "20px", padding: "20px", width: "100%" }}>
        <div style={{ padding: "30px" }}>
          <h2 style={{ fontWeight: "bold", fontFamily: "Time New Roman" }}>
            Room Listings
          </h2>
          <p
            style={{
              color: "#666",
              fontSize: "14px",
              marginBottom: "20px",
              maxWidth: "450px",
            }}
          >
            View, edit, or manage all listed rooms. Keep the information
            up-to-date to provide the best experience for users.
          </p>

          <Table bordered hover responsive style={{ background: "white" }}>
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th>Room Type</th>
                <th>Facility</th>
                <th>Price / night</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms?.length > 0 ? (
                rooms.map((room, index) => (
                  <tr key={index}>
                    <td>{room.roomType}</td>
                    <td>{room.animties?.join(", ")}</td>
                    <td>${room.pricePerNight}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        checked={room.isAvailable}
                        onChange={async () => {
                          try {
                            const res = await toggleRoomAvailability(room._id);

                            // ✅ حدث الحالة في rooms
                            const updatedRooms = [...rooms];
                            updatedRooms[index].isAvailable =
                              res.data.isAvailable;
                            setRooms(updatedRooms);

                            // ✅ رسالة نجاح
                            toast.success(
                              `Room is now ${
                                res.data.isAvailable
                                  ? "Available"
                                  : "Unavailable"
                              }`
                            );
                          } catch (err) {
                            console.error(
                              "❌ Failed to toggle availability:",
                              err
                            );
                            toast.error(
                              "Something went wrong while updating availability"
                            );
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No rooms found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RoomListings;

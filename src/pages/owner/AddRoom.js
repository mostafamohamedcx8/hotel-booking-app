// AddRoom.js
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
import { getMyHotels } from "../../services/hotelService";
import { createRoom } from "../../services/roomService";
import { toast } from "react-toastify";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    hotel: "", // لازم تحط ID الفندق
    roomType: "",
    pricePerNight: 0,
    animties: [],
    images: [], // افتراضياً فاضية
  });
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await getMyHotels();
        if (res.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            hotel: res.data[0]._id, // ⬅️ خد أول فندق
          }));
          console.log("✅ Hotel ID set:", res.data[0]._id);
        } else {
          console.warn("⚠️ No hotels found for this owner.");
        }
      } catch (error) {
        console.error("❌ Error fetching hotel ID:", error);
      }
    };

    fetchHotel();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      animties: checked
        ? [...prev.animties, value]
        : prev.animties.filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("hotel", formData.hotel);
    data.append("roomType", formData.roomType);
    data.append("pricePerNight", formData.pricePerNight);

    formData.animties.forEach((item) => {
      data.append("animties[]", item); // ← لو السيرفر يستقبلها كمصفوفة
    });

    formData.images.forEach((image) => {
      data.append("images", image);
    });

    try {
      const res = await createRoom(data);
      toast.success("🟢 Room added successfully");
      setFormData((prev) => ({
        hotel: prev.hotel, // احتفظ بـ hotel ID
        roomType: "",
        pricePerNight: 0,
        animties: [],
        images: [],
      }));
      console.log(res);
    } catch (error) {
      console.error("Error adding room:", error);
      toast.error("❌ Failed to add room");
    }
  };
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <OwnerSidebar />

      {/* Main Content */}
      <div style={{ marginLeft: "20px", padding: "20px", width: "100%" }}>
        <div style={{ padding: "30px" }}>
          <h2 style={{ fontWeight: "bold", fontFamily: "Time New Roman" }}>
            Add Room
          </h2>
          <p
            style={{
              color: "#666",
              marginBottom: "25px",
              fontSize: "14px",
              maxWidth: "480px",
            }}
          >
            Fill in the details carefully and accurate room details, pricing,
            and amenities, to enhance the user booking experience.
          </p>

          <Form onSubmit={handleSubmit}>
            {/* Images */}
            <Form.Group style={{ marginBottom: "20px" }}>
              <Form.Label>Images</Form.Label>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: "100px",
                      height: "100px",
                      border: "2px dashed #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "8px",
                      background: "#f9f9f9",
                    }}
                    onClick={() =>
                      document.getElementById(`fileInput${index}`).click()
                    }
                  >
                    {formData.images[index] ? (
                      <img
                        src={URL.createObjectURL(formData.images[index])}
                        alt={`Preview ${index}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: "24px", color: "#bbb" }}>+</span>
                    )}
                    <input
                      type="file"
                      id={`fileInput${index}`}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const newFiles = [...formData.images];
                        newFiles[index] = e.target.files[0];
                        setFormData((prev) => ({
                          ...prev,
                          images: newFiles,
                        }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </Form.Group>

            {/* Room Type & Price */}
            <Row style={{ marginBottom: "20px" }}>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Room Type</Form.Label>
                  <Form.Select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                  >
                    <option>Select Room Type</option>
                    <option>Single Bed</option>
                    <option>Double Bed</option>
                    <option>Suite</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Price / night</Form.Label>
                  <Form.Control
                    type="number"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Amenities */}
            <Form.Group style={{ marginBottom: "30px" }}>
              <Form.Label>Amenities</Form.Label>
              <div>
                {[
                  "Free WiFi",
                  "Free Breakfast",
                  "Room Service",
                  "Mountain View",
                  "Pool Access",
                ].map((amenity, index) => (
                  <Form.Check
                    key={index}
                    label={amenity}
                    value={amenity}
                    onChange={handleAmenityChange}
                    checked={formData.animties.includes(amenity)}
                  />
                ))}
              </div>
            </Form.Group>

            <Button onClick={handleSubmit} variant="primary">
              Add Room
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;

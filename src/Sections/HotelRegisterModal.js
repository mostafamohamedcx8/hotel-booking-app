import React, { useState } from "react";
import { Modal, Button, Form, Col, Image } from "react-bootstrap";
import { registerHotel } from "../services/hotelService";
import { toast } from "react-toastify";

const HotelRegisterModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerHotel(formData);
      console.log("✅ Hotel registered:", res);
      toast.success("🟢 Hotel registered!");

      // 🟡 تحديث بيانات المستخدم في localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.role = "hotelOwner";
        localStorage.setItem("user", JSON.stringify(user));
      }

      handleClose(); // اغلاق المودال
    } catch (err) {
      console.error(
        "❌ Failed to register hotel:",
        err.response?.data || err.message
      );
      toast.error("❌ Failed to register hotel");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      style={{ zIndex: "9999" }}
    >
      <Modal.Body style={{ padding: 0, display: "flex", flexWrap: "wrap" }}>
        <Col
          md={6}
          style={{
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <Image
            src="https://media.cntraveler.com/photos/58b463fe07cfb872af460fd6/master/pass/poolside-03-Burj-Al-Arab-Terrace-Infinity-Pool-cr-courtesy.jpg"
            alt="Hotel"
            fluid
            style={{ height: "100%", objectFit: "cover" }}
          />
        </Col>

        <Col md={6} style={{ padding: "30px 25px", backgroundColor: "#fff" }}>
          <h5 style={{ fontWeight: "bold", marginBottom: "25px" }}>
            Register Your Hotel
          </h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Type here"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                placeholder="Type here"
                value={formData.contact}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Type here"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>City</Form.Label>
              <Form.Select
                name="city"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                <option>Cairo</option>
                <option>Alaxendria</option>
                <option>Dubai</option>
                <option>New York</option>
              </Form.Select>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              style={{
                width: "100%",
                fontWeight: "bold",
                backgroundColor: "#4f46e5",
                borderColor: "#4f46e5",
              }}
            >
              Register
            </Button>
          </Form>
        </Col>
      </Modal.Body>
    </Modal>
  );
};

export default HotelRegisterModal;

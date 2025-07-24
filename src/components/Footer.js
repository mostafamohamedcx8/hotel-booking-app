// Footer.jsx
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
} from "react-bootstrap-icons";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#f9fbfc",
        paddingTop: "60px",
        paddingBottom: "30px",
        borderTop: "1px solid #dee2e6",
        fontSize: "0.95rem",
        color: "#444",
      }}
    >
      <Container>
        <Row className="mb-5">
          {/* Logo & Social */}
          <Col md={3}>
            <h5 style={{ fontWeight: "bold" }}>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                <i
                  className="bi bi-house-door-fill"
                  style={{ marginRight: "10px" }}
                ></i>
              </span>
              Stayzy
            </h5>
            <p style={{ color: "#6c757d", marginTop: "10px" }}>
              Discover the world’s most extraordinary places to stay, from
              boutique hotels to luxury villas and private islands.
            </p>
            <div style={{ fontSize: "1.2rem", marginTop: "10px" }}>
              <Instagram style={{ marginRight: "10px", cursor: "pointer" }} />
              <Facebook style={{ marginRight: "10px", cursor: "pointer" }} />
              <Twitter style={{ marginRight: "10px", cursor: "pointer" }} />
              <Linkedin style={{ cursor: "pointer" }} />
            </div>
          </Col>

          {/* Company */}
          <Col md={3}>
            <h6 style={{ fontWeight: "bold", marginBottom: "15px" }}>
              COMPANY
            </h6>
            <ul
              style={{ listStyle: "none", paddingLeft: 0, lineHeight: "1.9" }}
            >
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#444" }}>
                  About
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#444" }}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#444" }}>
                  Press
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#444" }}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#444" }}>
                  Partners
                </a>
              </li>
            </ul>
          </Col>

          {/* Support */}
          <Col md={3}>
            <h6 style={{ fontWeight: "bold", marginBottom: "15px" }}>
              SUPPORT
            </h6>
            <ul
              style={{ listStyle: "none", paddingLeft: 0, lineHeight: "1.9" }}
            >
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#444" }}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#444" }}>
                  Safety Information
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#444" }}>
                  Cancellation Options
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#444" }}>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "#444" }}>
                  Accessibility
                </a>
              </li>
            </ul>
          </Col>

          {/* Stay Updated */}
          <Col md={3}>
            <h6 style={{ fontWeight: "bold", marginBottom: "15px" }}>
              STAY UPDATED
            </h6>
            <p style={{ color: "#6c757d" }}>
              Subscribe to our newsletter for inspiration and special offers.
            </p>
            <Form style={{ display: "flex" }}>
              <Form.Control
                type="email"
                placeholder="Your email"
                style={{
                  borderRadius: "0",
                  borderRight: "none",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                }}
              />
              <Button
                style={{
                  backgroundColor: "#000",
                  border: "1px solid #000",
                  borderRadius: "0",
                }}
              >
                <ArrowRight />
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Bottom line */}
        <div
          style={{
            borderTop: "1px solid #dee2e6",
            paddingTop: "20px",
            fontSize: "0.85rem",
            color: "#6c757d",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div>© 2025 Stayzy. All rights reserved.</div>
          <div>
            <a
              href="#"
              style={{
                color: "#6c757d",
                marginRight: "15px",
                textDecoration: "none",
              }}
            >
              Privacy
            </a>
            <a
              href="#"
              style={{
                color: "#6c757d",
                marginRight: "15px",
                textDecoration: "none",
              }}
            >
              Terms
            </a>
            <a href="#" style={{ color: "#6c757d", textDecoration: "none" }}>
              Sitemap
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;

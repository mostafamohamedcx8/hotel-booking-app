// NewsletterSection.jsx
import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";

const NewsletterSection = () => {
  return (
    <div
      style={{
        backgroundColor: "#0d1117",
        color: "#ffffff",
        padding: "60px 20px",
        borderRadius: "15px",
        margin: "50px auto",
        maxWidth: "800px",
        textAlign: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
              Stay Inspired
            </h2>
            <p style={{ color: "#b1b1b1", marginBottom: "30px" }}>
              Join our newsletter and be the first to discover new destinations,
              exclusive offers, and travel inspiration.
            </p>

            <Form>
              <InputGroup
                className="mb-3"
                style={{ maxWidth: "500px", margin: "0 auto" }}
              >
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    backgroundColor: "#1c1f26",
                    border: "none",
                    color: "#fff",
                    padding: "12px",
                  }}
                />
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#000",
                    border: "none",
                    padding: "12px 20px",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "500",
                  }}
                >
                  Subscribe <ArrowRight style={{ marginLeft: "10px" }} />
                </Button>
              </InputGroup>
            </Form>

            <p
              style={{
                color: "#6c757d",
                fontSize: "0.85rem",
                marginTop: "10px",
              }}
            >
              By subscribing, you agree to our{" "}
              <a href="#" style={{ color: "#999" }}>
                Privacy Policy
              </a>{" "}
              and consent to receive updates.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewsletterSection;

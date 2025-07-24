import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { login } from "../services/authService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const LoginModal = ({ show, handleClose }) => {
  const [step, setStep] = useState(1); // 1: Email Step, 2: Password Step
  const [email, setEmail] = useState("mostafa143@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleContinue = () => {
    if (email.trim() === "") return;
    setStep(2);
  };

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });

      Cookies.set("token", res.token, { expires: 7 });
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", JSON.stringify(res.token));

      toast.success("✅ Login successful!");

      handleClose();
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      toast.error("❌ Login failed. Please check your email or password.");
    }
  };

  const resetModal = () => {
    setStep(1);
    setEmail("");
    setPassword("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={resetModal} centered>
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            letterSpacing: "0.5px",
          }}
        >
          Sign in to Stayzy
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: "25px" }}>
        <p
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "1rem",
            color: "#555",
          }}
        >
          Welcome back! Please sign in to continue
        </p>

        {/* Google Button (only on step 1) */}
        {step === 1 && (
          <>
            <Button
              variant="light"
              style={{
                width: "100%",
                marginBottom: "20px",
                border: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                fontWeight: "500",
                gap: "10px",
              }}
            >
              <FaGoogle style={{ color: "#a5a3acff", fontSize: "1.2rem" }} />
              Continue with Google
            </Button>

            <div
              style={{
                textAlign: "center",
                margin: "20px 0",
                fontSize: "0.9rem",
                color: "#999",
              }}
            >
              or
            </div>
          </>
        )}

        {/* Step Form */}
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "0.95rem",
              }}
              disabled={step === 2}
            />
          </Form.Group>

          {step === 2 && (
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "0.95rem",
                }}
              />
            </Form.Group>
          )}

          <Button
            variant="dark"
            style={{
              width: "100%",
              padding: "10px",
              fontWeight: "bold",
              fontSize: "0.95rem",
            }}
            onClick={step === 1 ? handleContinue : handleLogin}
          >
            {step === 1 ? "Continue →" : "Sign in"}
          </Button>
        </Form>

        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
            fontSize: "0.9rem",
            color: "#555",
          }}
        >
          {step === 1 ? (
            <>
              <div style={{ marginBottom: "10px" }}>
                Forgot Password? <a href="#">Reset Password</a>
              </div>
              Don’t have an account? <a href="#">Sign up</a>
            </>
          ) : (
            <div>
              <a href="#" onClick={() => setStep(1)}>
                ← Back to email
              </a>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;

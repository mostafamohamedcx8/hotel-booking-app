import React, { useState, useEffect } from "react";
import { Dropdown, Container, Navbar, Button } from "react-bootstrap";
import LoginModal from "../LoginModal";
import { useNavigate } from "react-router-dom";
const OwnerNavbar = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const token = localStorage.getItem("token");
  const handleShow = () => setShowLogin(true);
  const handleClose = () => setShowLogin(false);
  const userdata = JSON.parse(localStorage.getItem("user"));

  const user = {
    name: userdata?.username,
    email: userdata?.email,
    avatar: "/profile.jpeg",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <div className="d-flex justify-content-between align-items-center w-100">
            <Navbar.Brand
              href="/"
              style={{
                color: "#000",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              <i
                className="bi bi-house-door-fill"
                style={{ marginRight: "10px" }}
              ></i>
              Stayzy
            </Navbar.Brand>

            <div>
              {token ? (
                <Dropdown align="end">
                  <Dropdown.Toggle as="div" style={{ cursor: "pointer" }}>
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    align="end"
                    style={{
                      padding: "10px",
                      minWidth: "250px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      maxHeight: "250px",
                      overflowY: "auto",
                      zIndex: 9999,
                      backgroundColor: "#fff",
                    }}
                  >
                    <div className="d-flex align-items-center p-2 border-bottom">
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                          {user.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <Dropdown.Item
                      href="#"
                      className="d-flex align-items-center p-2"
                    >
                      <i className="bi bi-gear me-2"></i> Manage Account
                    </Dropdown.Item>{" "}
                    <Dropdown.Divider />
                    <Button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        borderRadius: "5px",
                        padding: "8px",
                        backgroundColor: "#333",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      Log Out
                    </Button>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  style={{
                    backgroundColor: "black",
                    border: "none",
                    borderRadius: "20px",
                    padding: "5px 20px",
                    fontWeight: "bold",
                  }}
                  onClick={handleShow}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Navbar>
      <LoginModal show={showLogin} handleClose={handleClose} />
    </>
  );
};

export default OwnerNavbar;

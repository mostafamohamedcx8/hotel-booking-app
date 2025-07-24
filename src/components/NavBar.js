import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  Dropdown,
} from "react-bootstrap";
import LoginModal from "./LoginModal";
import HotelRegisterModal from "../Sections/HotelRegisterModal";
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showReg, setShowReg] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991.98);
  const location = useLocation();
  const userdata = JSON.parse(localStorage.getItem("user"));

  const handleShow = () => setShowLogin(true);
  const handleClose = () => setShowLogin(false);
  const handleShowReghotel = () => setShowReg(true);
  const handleCloseReghotel = () => setShowReg(false);
  const token = localStorage.getItem("token");
  const user = {
    name: userdata?.username,
    email: userdata?.email,
    avatar: "/profile.jpeg",
  };
  console.log(userdata);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991.98);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <>
      <style>
        {`
          @media (max-width: 991.98px) {
            .navbar-collapse.show {
              background-color: #fff;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              padding: 20px 15px;
            }
            .navbar-collapse.show .nav-link {
              color: #000 !important;
              margin: 10px 0;
              text-align: right;
            }
            .dropdown-menu {
              left: auto !important;
              right: 0 !important;
              max-width: calc(100vw - 30px);
              width: 90%;
            }
          }
          .navbar {
            transition: background-color 0.3s ease-in-out;
          }
        `}
      </style>

      <Navbar
        expand="lg"
        style={{
          backgroundColor:
            isHomePage && !isScrolled
              ? "transparent"
              : "rgba(128, 128, 128, 0.8)",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          boxShadow: isScrolled ? "0 2px 5px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <Container fluid style={{ padding: "10px 40px" }}>
          {isMobile ? (
            <>
              <div className="d-flex justify-content-between align-items-center w-100">
                <Navbar.Brand
                  href="/"
                  style={{
                    color: isScrolled ? "#000" : "white",
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
                <div className="d-flex align-items-center gap-3">
                  <Form className="d-none d-lg-flex align-items-center">
                    <i
                      className="bi bi-search"
                      style={{
                        color: "white",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    ></i>
                  </Form>

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
                            <div
                              style={{ fontWeight: "bold", fontSize: "14px" }}
                            >
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
                        </Dropdown.Item>

                        <Dropdown.Item
                          href="/mybooking"
                          className="d-flex align-items-center p-2"
                        >
                          <i className="bi bi-bookmark me-2"></i> My Bookings
                        </Dropdown.Item>

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

                  <Navbar.Toggle
                    aria-controls="navbar-nav"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
              </div>
              <Navbar.Collapse id="navbar-nav">
                <Nav
                  className="me-auto"
                  style={{
                    gap: "20px",
                    alignItems: "center",
                    marginLeft: "30px",
                  }}
                >
                  <Nav.Link href="/" style={{ color: "white" }}>
                    Home
                  </Nav.Link>
                  <Nav.Link href="/rooms" style={{ color: "white" }}>
                    Hotels
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: "white" }}>
                    Experience
                  </Nav.Link>
                  <Nav.Link href="#" style={{ color: "white" }}>
                    About
                  </Nav.Link>
                  {userdata?.role === "hotelOwner" && (
                    <Nav.Link
                      href="/owner/dashboard"
                      style={{
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "20px",
                        padding: "5px 15px",
                      }}
                    >
                      Dashboard
                    </Nav.Link>
                  )}

                  {userdata?.role === "user" && (
                    <Nav.Link
                      href="#"
                      style={{
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "20px",
                        padding: "5px 15px",
                      }}
                      onClick={handleShowReghotel}
                    >
                      List Your Hotel
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center w-100">
                <Navbar.Brand
                  href="/"
                  style={{
                    color: isScrolled ? "#000" : "white",
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
                <Navbar.Collapse id="navbar-nav">
                  <Nav
                    className="me-auto"
                    style={{
                      gap: "20px",
                      alignItems: "center",
                      marginLeft: "30px",
                    }}
                  >
                    <Nav.Link href="/" style={{ color: "white" }}>
                      Home
                    </Nav.Link>
                    <Nav.Link href="/rooms" style={{ color: "white" }}>
                      Hotels
                    </Nav.Link>
                    <Nav.Link href="#" style={{ color: "white" }}>
                      Experience
                    </Nav.Link>
                    <Nav.Link href="#" style={{ color: "white" }}>
                      About
                    </Nav.Link>
                    {userdata?.role === "hotelOwner" && (
                      <Nav.Link
                        href="/owner/dashboard"
                        style={{
                          color: "white",
                          border: "1px solid white",
                          borderRadius: "20px",
                          padding: "5px 15px",
                        }}
                      >
                        Dashboard
                      </Nav.Link>
                    )}

                    {userdata?.role === "user" && (
                      <Nav.Link
                        href="#"
                        style={{
                          color: "white",
                          border: "1px solid white",
                          borderRadius: "20px",
                          padding: "5px 15px",
                        }}
                        onClick={handleShowReghotel}
                      >
                        List Your Hotel
                      </Nav.Link>
                    )}
                  </Nav>
                </Navbar.Collapse>
                <div className="d-flex align-items-center gap-3">
                  <Form className="d-none d-lg-flex align-items-center">
                    <i
                      className="bi bi-search"
                      style={{
                        color: "white",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    ></i>
                  </Form>

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
                            <div
                              style={{ fontWeight: "bold", fontSize: "14px" }}
                            >
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
                        </Dropdown.Item>

                        <Dropdown.Item
                          href="/mybooking"
                          className="d-flex align-items-center p-2"
                        >
                          <i className="bi bi-bookmark me-2"></i> My Bookings
                        </Dropdown.Item>

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

                  <Navbar.Toggle
                    aria-controls="navbar-nav"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
              </div>
            </>
          )}
        </Container>
      </Navbar>

      <LoginModal show={showLogin} handleClose={handleClose} />
      <HotelRegisterModal show={showReg} handleClose={handleCloseReghotel} />
    </>
  );
};

export default CustomNavbar;

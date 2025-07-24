import React from "react";
import { Nav } from "react-bootstrap";
import { FaTachometerAlt, FaPlusCircle, FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OwnerSidebar = () => {
  const navigate = useNavigate();

  const sidebarStyle = {
    height: "100vh",
    width: "350px",
    backgroundColor: "#1a1a2e",
    color: "white",
    paddingTop: "20px",

    left: 0,
    top: 0,
    boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
  };

  const itemStyle = {
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    transition: "background 0.2s",
  };

  const iconStyle = {
    marginRight: "10px",
    fontSize: "18px",
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div style={sidebarStyle}>
      <Nav className="flex-column">
        <div
          style={itemStyle}
          onClick={() => handleNavigate("/owner/dashboard")}
        >
          <FaTachometerAlt style={iconStyle} />
          Dashboard
        </div>
        <div style={itemStyle} onClick={() => handleNavigate("/owner/addroom")}>
          <FaPlusCircle style={iconStyle} />
          Add Room
        </div>
        <div
          style={itemStyle}
          onClick={() => handleNavigate("/owner/listroom")}
        >
          <FaList style={iconStyle} />
          List Room
        </div>
      </Nav>
    </div>
  );
};

export default OwnerSidebar;

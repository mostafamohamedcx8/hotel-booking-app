import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomNavbar from "./components/NavBar";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import HotelDetails from "./pages/HotelDetails";
import { AllRoom } from "./pages/AllRoom";
import MyBookings from "./pages/MyBookings";
import OwnerNavbar from "./components/owner/OwnerNavbar";
import OwnerPage from "./pages/owner/OwnerPage";
import AddRoom from "./pages/owner/AddRoom";
import RoomListings from "./pages/owner/RoomListings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes("owner");

  return (
    <div className="App">
      {!isOwnerPath && <CustomNavbar />}
      {isOwnerPath && <OwnerNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<AllRoom />} />
        <Route path="/hoteldetails/:id" element={<HotelDetails />} />
        <Route path="/mybooking" element={<MyBookings />} />
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute>
              <OwnerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/addroom"
          element={
            <ProtectedRoute>
              <AddRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/listroom"
          element={
            <ProtectedRoute>
              <RoomListings />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default App;

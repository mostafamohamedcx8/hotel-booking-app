import axiosInstance from "../api/axiosInstance";

export const getBookingsByHotel = async (hotelId) => {
  const response = await axiosInstance.get(`/booking/hotel/${hotelId}`);
  return response.data;
};
export const checkAvailabilityAPI = async ({
  room,
  checkInDate,
  checkOutDate,
}) => {
  const response = await axiosInstance.post("/booking", {
    room,
    checkInDate,
    checkOutDate,
  });

  return response.data;
};

export const bookRoomAPI = async (bookingData) => {
  const response = await axiosInstance.post("/booking/bookroom", bookingData);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await axiosInstance.get("/booking/mybooking");
  return response.data;
};

export const getCheckoutSession = async (bookingId) => {
  const response = await axiosInstance.get(
    `/booking/check_out_session/${bookingId}`
  );
  return response.data;
};

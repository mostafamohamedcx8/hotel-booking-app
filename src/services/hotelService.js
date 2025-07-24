import axiosInstance from "../api/axiosInstance";

export const registerHotel = async (hotelData) => {
  const response = await axiosInstance.post("/hotel", hotelData);
  return response.data;
};

export const getMyHotels = async () => {
  const response = await axiosInstance.get("/hotel");
  return response.data;
};

import axiosInstance from "../api/axiosInstance";

export const createRoom = (formData) => {
  return axiosInstance.post("/room", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getRoomsByHotel = async (hotelId) => {
  const response = await axiosInstance.get(`/room/${hotelId}`);
  return response.data;
};

export const toggleRoomAvailability = async (roomId) => {
  const response = await axiosInstance.put(`/room/${roomId}`);
  return response.data;
};

export const getAllRooms = async () => {
  const response = await axiosInstance.get("/room?limit=4");
  return response.data;
};

export const getAllRoom = async (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const response = await axiosInstance.get(`/room?${queryString}`);
  return response.data;
};

export const getSpecificRoom = async (id) => {
  const response = await axiosInstance.get(`/room/specific/${id}`);
  return response.data;
};

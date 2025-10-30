import axios from "axios";

const USE_MOCK = true;
const BASE_URL = "http://localhost:5000/api";

export const api = axios.create({ baseURL: BASE_URL });

// Mock data for demo
let mockVehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

export const getVehicles = async () => {
  if (USE_MOCK) return mockVehicles;
  const { data } = await api.get("/vehicles");
  return data;
};

export const addVehicle = async (v) => {
  if (USE_MOCK) {
    v.id = Date.now();
    mockVehicles.push(v);
    localStorage.setItem("vehicles", JSON.stringify(mockVehicles));
    return v;
  }
  const { data } = await api.post("/vehicles", v);
  return data;
};

export const deleteVehicle = async (id) => {
  if (USE_MOCK) {
    mockVehicles = mockVehicles.filter((v) => v.id !== id);
    localStorage.setItem("vehicles", JSON.stringify(mockVehicles));
    return true;
  }
  await api.delete(`/vehicles/${id}`);
};

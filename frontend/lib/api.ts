import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

// GET all experiences
export const getExperiences = () => api.get("/experiences");

// GET experience by ID
export const getExperienceById = (id: string) => api.get(`/experiences/${id}`);

// POST booking
export const createBooking = (data: any) => api.post("/bookings", data);

// POST promo validation
export const validatePromo = (code: string) =>
  api.post("/promo/validate", { code });

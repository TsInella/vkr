import axios from "axios";

const API_BASE = "http://5.35.98.185:4444/api/auth";

export const login = (data: { email: string; password: string }) => {
    return axios.post(`${API_BASE}/login`, data);
};

export const register = (data: { email: string; password: string }) => {
    return axios.post(`${API_BASE}/registration`, data);
};
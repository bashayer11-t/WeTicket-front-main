import { API_URL } from "./api";

export const Login = async (data) => {
  const response = await fetch(`${API_URL}/api/Auth/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export const Register = async (data) => {
  const response = await fetch(`${API_URL}/api/Auth/Register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
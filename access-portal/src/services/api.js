// src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const submitAccessRequest = async (requestData, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}/ProcessAccessRequest`, {
    method: "POST",
    headers,
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
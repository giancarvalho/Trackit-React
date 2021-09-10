import axios from "axios";
const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function registerRequest(body) {
  return axios.post(`${URL}/auth/sign-up`, body);
}

function loginRequest(body) {
  return axios.post(`${URL}/auth/login`, body);
}

function createHabitRequest(body, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.post(`${URL}/habits`, body, config);
}

export { registerRequest, loginRequest, createHabitRequest };

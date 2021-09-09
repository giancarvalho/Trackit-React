import axios from "axios";
const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth";

function registerRequest(body) {
  return axios.post(`${URL}/sign-up`, body);
}

function loginRequest(body) {
  return axios.post(`${URL}/login`, body);
}

export { registerRequest, loginRequest };

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

function getHabitList(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${URL}/habits`, config);
}

function getTodayHabitList(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(`${URL}/habits/today`, config);

  return axios.get(`${URL}/habits/today`, config);
}

function checkHabitRequest(id, operation, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.post(`${URL}/habits/${id}/${operation}`, "", config);
}

function deleteHabitRequest(id, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.delete(`${URL}/habits/${id}/`, config);
}

export {
  registerRequest,
  loginRequest,
  createHabitRequest,
  getHabitList,
  getTodayHabitList,
  checkHabitRequest,
  deleteHabitRequest,
};

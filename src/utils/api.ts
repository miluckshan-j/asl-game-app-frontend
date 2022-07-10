import axios from "axios";

import { ResponseCodes } from "./responseCodes";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axiosClient.defaults.headers.common["Content-Type"] = "application/json";
axiosClient.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("asl_token") || "Bearer ";
axiosClient.defaults.timeout = 10000;

const errorObject = {
  data: {
    code: ResponseCodes.FAILED,
    message: "Something unexpected happened!",
  },
};

export const register = async (payload: object) => {
  try {
    const response = await axiosClient.post("/register", payload);
    return response;
  } catch (error) {
    console.error(error);
    return errorObject;
  }
};

export const login = async (payload: object) => {
  try {
    const response = await axiosClient.post("/login", payload);
    return response;
  } catch (error) {
    console.error(error);
    return errorObject;
  }
};

export const addGameResult = async (payload: object) => {
  try {
    const response = await axiosClient.post("/users/me/results", payload);
    return response;
  } catch (error) {
    console.error(error);
    return errorObject;
  }
};

export const retrieveProfile = async () => {
  try {
    const response = await axiosClient.get("/users/me");
    return response;
  } catch (error) {
    console.error(error);
    return errorObject;
  }
};

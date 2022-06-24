import axios from "axios";

import { ResponseCodes } from "./responseCodes";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axiosClient.defaults.headers.common["Content-Type"] = "application/json";
axiosClient.defaults.headers.common["Authorization"] =
  localStorage.getItem("asl_token") || "";
axiosClient.defaults.timeout = 2000;

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

import axios from "axios";

export const HTTP = axios.create({
  baseURL: `https://www.wrike.com/api/v4/`,
  headers: {
    Authorization:
      "Bearer token",
  },
});

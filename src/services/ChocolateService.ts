import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://some-url",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getChocolateData() {
    return apiClient.get("/chocolates");
  },
  getChocolateItem(id: any) {
    return apiClient.get("/chocolates/" + id);
  },
};

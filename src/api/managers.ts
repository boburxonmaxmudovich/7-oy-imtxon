import axiosClient from "./axiosClient";

export const getAllManagers = async () => {
  return await axiosClient.get("/staff/all-managers");
};

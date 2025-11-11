import axiosClient from "./axiosClient";

export const getAllAdmins = async () => {
  return await axiosClient.get("/staff/all-admins");
};

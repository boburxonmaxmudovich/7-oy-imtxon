import axiosClient from "./axiosClient";

export const getSettings = async () => {
  const res = await axiosClient.get("/settings/all");
  return res.data?.body || res.data;
};
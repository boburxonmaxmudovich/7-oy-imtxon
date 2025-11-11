import axiosClient from "./axiosClient";

export const getAllGroups = async () => {
  const res = await axiosClient.get("/group/get-all-group");
  return res.data;
};

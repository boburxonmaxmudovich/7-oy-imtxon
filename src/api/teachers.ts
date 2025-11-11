import axiosClient from "./axiosClient";

export const getAllTeachers = async () => {
  return await axiosClient.get("/teacher/get-all-teachers");
};

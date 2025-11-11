import axiosClient from "./axiosClient";

export const getCourses = async (is_freeze = false) => {
  const res = await axiosClient.get(`/api/course/get-courses?is_freeze=${is_freeze}`);
  return res.data?.body || res.data;
};

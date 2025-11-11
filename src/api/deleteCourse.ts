import axiosClient from "./axiosClient";

export const deleteCourse = async (course_id: string) => {
  const res = await axiosClient.delete("/course/delete-course", {
    data: { course_id },
  });
  return res.data;
};

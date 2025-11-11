import axiosClient from "./axiosClient";

export const getAllStudents = async () => {
  try {
    const res = await axiosClient.get("/student/get-all-students");
    return res.data;
  } catch (err) {
    console.error("O‘quvchilarni olishda xatoli bo ", err);
    throw err;
  }
};

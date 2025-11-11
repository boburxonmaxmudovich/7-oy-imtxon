import axiosClient from "./axiosClient";

export const getPayments = async () => {
  const res = await axiosClient.get("/api/payment/all");
  return res.data?.body || res.data;
};

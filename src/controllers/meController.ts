import { RequestHandler } from "express";

import fetchCat from "@/utils/fetchCat";

export const getProfile: RequestHandler = async (req, res) => {
  const user = {
    email: "adeolafadare8@gmail.com",
    name: "Adeola Fadare",
    stack: "NodeJs/Express",
  };
  const catFact = await fetchCat();
  const timestamp = new Date().toISOString();
  res.json({ status: "success", user, timestamp, fact: catFact.fact });
};

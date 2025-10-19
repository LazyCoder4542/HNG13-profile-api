import { CatFact } from "@t/index";
import axios from "axios";

import AppError from "@/error";

export default async function fetchCat() {
  const catAPI = process.env.CAT_API;
  if (catAPI) {
    const response = await axios
      .get<CatFact>(catAPI)
      .then((res) => res.data)
      .catch(() => {
        throw new AppError("CatFact error", 503);
      });
    return response;
  }
  throw new Error("endpoint not defined");
}

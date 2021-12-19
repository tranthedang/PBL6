import axios from "axios";
import { URL } from "../constants/api";

const baseConfig = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseConfig;

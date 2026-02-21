import axios from "axios";
import type { ApiResponse } from "./types";

const BASE_URL = "https://api.artic.edu/api/v1/artworks";

export const fetchArtworks = async (page: number, limit: number) => {
  const response = await axios.get<ApiResponse>(
    `${BASE_URL}?page=${page}&limit=${limit}`
  );
  return response.data;
};
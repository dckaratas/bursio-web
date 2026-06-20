import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "@/constants";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export function useSystemStatus() {
  return useQuery({
    queryKey: ["systemStatus"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}${API_ENDPOINTS.PUBLIC.STATUS}`);
      return res.data as { active: boolean; message: string };
    },
    // Auth gerektirmediği için interceptor'suz axios kullanıyoruz
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000, // 1 dakikada bir güncelle
    retry: false,
  });
}

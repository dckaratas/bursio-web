import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { University, PageResponse } from "@/types";

export function useUniversities(query = "", size = 10) {
  return useQuery({
    queryKey: ["universities", query],
    queryFn: async () => {
      const res = await api.get<PageResponse<University>>(
        "/api/universities/search",
        { params: { query, size } }
      );
      return res.data.content;
    },
    staleTime: 60 * 60 * 1000, // 1 saat — üniversiteler sık değişmez
  });
}
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { API_ENDPOINTS } from "@/constants";
import { MatchResponse, PageResponse } from "@/types";

export function useStudentMatches(page = 0) {
  return useQuery({
    queryKey: ["studentMatches", page],
    queryFn: async () => {
      const res = await api.get<PageResponse<MatchResponse>>(
        API_ENDPOINTS.MATCHES.STUDENT,
        { params: { page, size: 10 } }
      );
      return res.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useDonorMatches(page = 0) {
  return useQuery({
    queryKey: ["donorMatches", page],
    queryFn: async () => {
      const res = await api.get<PageResponse<MatchResponse>>(
        API_ENDPOINTS.MATCHES.DONOR,
        { params: { page, size: 10 } }
      );
      return res.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useRespondToMatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      matchId,
      action,
    }: {
      matchId: number;
      action: "ACCEPTED" | "DECLINED";
    }) => api.put(API_ENDPOINTS.MATCHES.RESPOND(matchId), { action }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentMatches"] });
    },
  });
}

export function useCreateRandomMatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: object) =>
      api.post(API_ENDPOINTS.MATCHES.RANDOM, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donorMatches"] });
    },
  });
}
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { API_ENDPOINTS } from "@/constants";
import { StudentProfile } from "@/types";

export function useStudentProfile() {
  return useQuery({
    queryKey: ["studentProfile"],
    queryFn: async () => {
      try {
        const res = await api.get<StudentProfile>(API_ENDPOINTS.STUDENT.PROFILE);
        return res.data;
      } catch {
        return null; // profil henüz yok
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateStudentProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: object) => api.put(API_ENDPOINTS.STUDENT.PROFILE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentProfile"] });
    },
  });
}

export function useProfileComplete() {
  return useQuery({
    queryKey: ["studentProfile"],
    queryFn: async () => {
      try {
        const res = await api.get<StudentProfile>(API_ENDPOINTS.STUDENT.PROFILE);
        return res.data;
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}
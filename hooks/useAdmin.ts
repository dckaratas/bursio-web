import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { API_ENDPOINTS } from "@/constants";
import { AccountStatus, PageResponse, ReportStatus } from "@/types";

export function useAdminUsers(page = 0) {
  return useQuery({
    queryKey: ["adminUsers", page],
    queryFn: async () => {
      const res = await api.get(API_ENDPOINTS.ADMIN.USERS, {
        params: { page, size: 20 },
      });
      return res.data;
    },
    staleTime: 60 * 1000,
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, status }: { userId: number; status: AccountStatus }) =>
      api.put(API_ENDPOINTS.ADMIN.USER_STATUS(userId), { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
  });
}

export function useAdminReports(page = 0, status?: string) {
  return useQuery({
    queryKey: ["adminReports", page, status],
    queryFn: async () => {
      const res = await api.get(API_ENDPOINTS.ADMIN.REPORTS, {
        params: { page, size: 20, status: status || undefined },
      });
      return res.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useUpdateReportStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reportId, status }: { reportId: number; status: ReportStatus }) =>
      api.put(API_ENDPOINTS.ADMIN.REPORT_STATUS(reportId), null, {
        params: { status },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminReports"] });
    },
  });
}

export function useAdminUniversities(page = 0) {
  return useQuery({
    queryKey: ["adminUniversities", page],
    queryFn: async () => {
      const res = await api.get(API_ENDPOINTS.ADMIN.UNIVERSITIES, {
        params: { page, size: 20 },
      });
      return res.data;
    },
    staleTime: 60 * 60 * 1000,
  });
}

export function useAddUniversity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: object) => api.post(API_ENDPOINTS.ADMIN.UNIVERSITIES, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUniversities"] });
    },
  });
}

export function useToggleUniversity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (universityId: number) =>
      api.patch(API_ENDPOINTS.ADMIN.UNIVERSITY_TOGGLE(universityId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUniversities"] });
    },
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const [users, reports, universities] = await Promise.all([
        api.get(API_ENDPOINTS.ADMIN.USERS, { params: { size: 1 } }),
        api.get(API_ENDPOINTS.ADMIN.REPORTS, { params: { status: "OPEN", size: 1 } }),
        api.get(API_ENDPOINTS.ADMIN.UNIVERSITIES, { params: { size: 1 } }),
      ]);
      return {
        totalUsers: users.data.totalElements,
        openReports: reports.data.totalElements,
        totalUniversities: universities.data.totalElements,
      };
    },
    staleTime: 60 * 1000,  // 1 dakika
  });
}
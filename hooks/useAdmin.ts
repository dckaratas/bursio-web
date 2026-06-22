import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { API_ENDPOINTS } from "@/constants";
import { AccountStatus, AdminUserDetail, PageResponse, ReportStatus } from "@/types";

export function useAdminUsers(query = "", role = "", page = 0) {
  return useQuery({
    queryKey: ["adminUsers", query, role, page],
    queryFn: async () => {
      const res = await api.get(API_ENDPOINTS.ADMIN.USERS, {
        params: { query: query || undefined, role: role || undefined, page, size: 20 },
      });
      return res.data;
    },
    staleTime: 60 * 1000,
  });
}

export function useAdminUserDetail(userId: number | null) {
  return useQuery({
    queryKey: ["adminUserDetail", userId],
    queryFn: async () => {
      const res = await api.get<AdminUserDetail>(API_ENDPOINTS.ADMIN.USER_DETAIL(userId!));
      return res.data;
    },
    enabled: userId !== null,
    staleTime: 30 * 1000,
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

export function useAdminReports(query = "", status = "", page = 0) {
  return useQuery({
    queryKey: ["adminReports", query, status, page],
    queryFn: async () => {
      const res = await api.get(API_ENDPOINTS.ADMIN.REPORTS, {
        params: { query: query || undefined, status: status || undefined, page, size: 20 },
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

export function useAdminUniversities(query = "", page = 0, active: boolean | null = null) {
  return useQuery({
    queryKey: ["adminUniversities", query, page, active],
    queryFn: async () => {
      const res = await api.get(API_ENDPOINTS.ADMIN.UNIVERSITIES, {
        params: {
          query: query || undefined,
          page,
          size: 20,
          active: active !== null ? active : undefined,
        },
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

export function useAdminMaintenance() {
  return useQuery({
    queryKey: ["adminMaintenance"],
    queryFn: async () => {
      const res = await api.get(API_ENDPOINTS.ADMIN.MAINTENANCE);
      return res.data as { active: boolean; message: string };
    },
    staleTime: 0,
  });
}

export function useSetMaintenance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { active: boolean; message: string }) =>
      api.put(API_ENDPOINTS.ADMIN.MAINTENANCE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminMaintenance"] });
    },
  });
}
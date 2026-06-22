"use client";

import { useState } from "react";
import { User, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import UserDrawer from "@/components/admin/UserDrawer";
import { useAdminUsers, useUpdateUserStatus } from "@/hooks/useAdmin";
import { AccountStatus } from "@/types";

const statusVariant: Record<AccountStatus, "success" | "warning" | "danger"> = {
  ACTIVE: "success",
  PENDING_VERIFICATION: "warning",
  SUSPENDED: "danger",
};

const statusLabel: Record<AccountStatus, string> = {
  ACTIVE: "Aktif",
  PENDING_VERIFICATION: "Doğrulama Bekliyor",
  SUSPENDED: "Askıya Alındı",
};

export default function AdminUsersPage() {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { data, isLoading, error } = useAdminUsers(query, role, page);
  const updateStatusMutation = useUpdateUserStatus();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchInput);
    setPage(0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kullanıcılar</h1>
        <p className="text-gray-500 text-sm mt-1">
          Toplam {data?.totalElements ?? 0} kullanıcı
        </p>
      </div>

      {error && (
        <Alert type="error" message="Kullanıcılar yüklenirken hata oluştu." className="mb-6" />
      )}

      {updateStatusMutation.isError && (
        <Alert
          type="error"
          message={
            (updateStatusMutation.error as any)?.response?.data?.message ??
            "Durum güncellenirken hata oluştu."
          }
          className="mb-6"
        />
      )}

      {/* Arama ve Filtre */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <Input
            placeholder="İsim veya email ara..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="sm">
            <Search className="w-4 h-4" />
          </Button>
        </form>
        <div className="sm:w-48">
          <Select
            options={[
              { value: "", label: "Tüm Roller" },
              { value: "STUDENT", label: "Öğrenci" },
              { value: "DONOR", label: "Burs Veren" },
            ]}
            value={role}
            onChange={(e) => { setRole(e.target.value); setPage(0); }}
            clearable
            onClear={() => { setRole(""); setPage(0); }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {data?.content.map((user: any) => (
          <Card
            key={user.id}
            padding="sm"
            className="cursor-pointer hover:border-blue-200 hover:shadow-sm transition-all"
            onClick={() => setSelectedUserId(user.id)}
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Badge
                  label={user.role === "STUDENT" ? "Öğrenci" : user.role === "DONOR" ? "Burs Veren" : "Admin"}
                  variant={user.role === "STUDENT" ? "info" : user.role === "DONOR" ? "success" : "gray"}
                />
                <Badge
                  label={statusLabel[user.status as AccountStatus]}
                  variant={statusVariant[user.status as AccountStatus]}
                />
                {user.role !== "ADMIN" && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <Select
                      options={[
                        { value: "ACTIVE", label: "Aktif" },
                        { value: "SUSPENDED", label: "Askıya Al" },
                      ]}
                      value={user.status === "SUSPENDED" ? "SUSPENDED" : "ACTIVE"}
                      onChange={(e) =>
                        updateStatusMutation.mutate({
                          userId: user.id,
                          status: e.target.value as AccountStatus,
                        })
                      }
                      disabled={updateStatusMutation.isPending}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 mt-6">
          <Button variant="secondary" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
            <ChevronLeft className="w-4 h-4 mr-1" />Önceki
          </Button>
          <p className="text-sm text-gray-500 shrink-0">{page + 1} / {data.totalPages}</p>
          <Button variant="secondary" size="sm" disabled={data.last} onClick={() => setPage(page + 1)}>
            Sonraki<ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}

      <UserDrawer
        userId={selectedUserId}
        onClose={() => setSelectedUserId(null)}
      />
    </div>
  );
}
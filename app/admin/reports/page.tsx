"use client";

import { useState } from "react";
import { Flag, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Select from "@/components/ui/Select";
import { useAdminReports, useUpdateReportStatus } from "@/hooks/useAdmin";
import { ReportStatus, Report } from "@/types";
import Input from "@/components/ui/Input";

const statusVariant: Record<ReportStatus, "danger" | "warning" | "success"> = {
  OPEN: "danger",
  REVIEWED: "warning",
  RESOLVED: "success",
};

const statusLabel: Record<ReportStatus, string> = {
  OPEN: "Açık",
  REVIEWED: "İnceleniyor",
  RESOLVED: "Çözüldü",
};

const reasonLabel: Record<string, string> = {
  FAKE_PROFILE: "Sahte Profil",
  HARASSMENT: "Taciz",
  SPAM: "Spam",
  OTHER: "Diğer",
};

export default function AdminReportsPage() {
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "">("");
  const { data, isLoading, error } = useAdminReports(query, statusFilter, page);
  const updateStatusMutation = useUpdateReportStatus();


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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Şikayetler</h1>
            <p className="text-gray-500 text-sm mt-1">
              Toplam {data?.totalElements ?? 0} şikayet
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1">
            <Input
              placeholder="Email ara..."
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
                { value: "", label: "Tümü" },
                { value: "OPEN", label: "Açık" },
                { value: "REVIEWED", label: "İnceleniyor" },
                { value: "RESOLVED", label: "Çözüldü" },
              ]}
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as ReportStatus | ""); setPage(0); }}
              clearable
              onClear={() => { setStatusFilter(""); setPage(0); }}
            />
          </div>
        </div>
      </div>

      {error && (
        <Alert type="error" message="Şikayetler yüklenirken hata oluştu." className="mb-6" />
      )}

      {updateStatusMutation.isError && (
        <Alert type="error" message="Durum güncellenirken hata oluştu." className="mb-6" />
      )}

      {data?.content.length === 0 ? (
        <Card className="text-center py-16">
          <Flag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Şikayet bulunamadı.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {data?.content.map((report: Report) => (
            <Card key={report.id} padding="sm">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      label={reasonLabel[report.reason] || report.reason}
                      variant="info"
                    />
                    <Badge
                      label={statusLabel[report.reportStatus]}
                      variant={statusVariant[report.reportStatus]}
                    />
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Şikayet eden:</span>{" "}
                    {report.reporterEmail}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Şikayet edilen:</span>{" "}
                    {report.reportedUserEmail}
                  </p>
                  {report.description && (
                    <p className="text-sm text-gray-500 italic mt-2">
                      "{report.description}"
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(report.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>

                <Select
                  options={[
                    { value: "OPEN", label: "Açık" },
                    { value: "REVIEWED", label: "İnceleniyor" },
                    { value: "RESOLVED", label: "Çözüldü" },
                  ]}
                  value={report.reportStatus}
                  onChange={(e) =>
                    updateStatusMutation.mutate({
                      reportId: report.id,
                      status: e.target.value as ReportStatus,
                    })
                  }
                  disabled={updateStatusMutation.isPending}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="secondary"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Önceki
          </Button>
          <p className="text-sm text-gray-500">
            {page + 1} / {data.totalPages}
          </p>
          <Button
            variant="secondary"
            size="sm"
            disabled={data.last}
            onClick={() => setPage(page + 1)}
          >
            Sonraki
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
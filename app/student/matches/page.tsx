"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Clock, User } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Alert from "@/components/ui/Alert";
import ReportModal from "@/components/ui/ReportModal";
import { MatchResponse, MatchStatus } from "@/types";
import { useStudentMatches, useRespondToMatch } from "@/hooks/useMatches";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { AlertCircle } from "lucide-react";

const statusConfig: Record<
  MatchStatus,
  { label: string; variant: "success" | "warning" | "danger" | "info" | "gray" }
> = {
  PENDING: { label: "Bekliyor", variant: "warning" },
  ACCEPTED: { label: "Kabul Edildi", variant: "success" },
  DECLINED: { label: "Reddedildi", variant: "danger" },
  EXPIRED: { label: "Süresi Doldu", variant: "gray" },
};

export default function StudentMatchesPage() {
  const { data: profile, isLoading: profileLoading } = useStudentProfile();
  const { data, isLoading, error } = useStudentMatches();
  const respondMutation = useRespondToMatch();
  const [reportModal, setReportModal] = useState<{
    open: boolean;
    userId: number;
    userName: string;
  }>({ open: false, userId: 0, userName: "" });

  if (isLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" />
      </div>
    );
  }

  // Profil tamamlanmamışsa uyarı göster
  if (!profile || !profile.profileComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Profilin Tamamlanmamış
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Burs tekliflerini görmek ve eşleşmelere katılmak için önce profilini
            doldurman gerekiyor.
          </p>
          <Link
            href={ROUTES.STUDENT.PROFILE}
            className="bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
          >
            Profili Doldur
          </Link>
        </div>
      </div>
    );
  }

  const matches = data?.content ?? [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Burs Teklifleri</h1>
        <p className="text-gray-500 text-sm mt-1">
          Sana gelen burs tekliflerini burada görebilirsin.
        </p>
      </div>

      {error && (
        <Alert type="error" message="Eşleşmeler yüklenirken hata oluştu." className="mb-6" />
      )}

      {respondMutation.isError && (
        <Alert
          type="error"
          message={
            (respondMutation.error as any)?.response?.data?.message ??
            "İşlem sırasında hata oluştu."
          }
          className="mb-6"
        />
      )}

      {matches.length === 0 ? (
        <Card className="text-center py-16">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-600 font-medium mb-1">Henüz bir teklif yok</h3>
          <p className="text-sm text-gray-400">
            Profilini doldurduktan sonra burs verenler seni keşfedebilir.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {matches.map((match: MatchResponse) => (
            <Card key={match.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {match.donorFirstName} {match.donorLastName}
                    </p>
                    <p className="text-sm text-gray-400">{match.donorEmail}</p>
                  </div>
                </div>
                <Badge
                  label={statusConfig[match.status].label}
                  variant={statusConfig[match.status].variant}
                />
              </div>

              {match.donorMessage && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 italic">
                    "{match.donorMessage}"
                  </p>
                </div>
              )}

              {match.status === "ACCEPTED" && match.contactValue && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-700 mb-1">İletişim Bilgisi</p>
                  <p className="text-sm text-green-600">
                    {match.contactPreference}: {match.contactValue}
                  </p>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                <p className="text-xs text-gray-400">
                  {new Date(match.createdAt).toLocaleDateString("tr-TR")}
                </p>

                <div className="flex items-center gap-3">
                  {(match.status === "PENDING" || match.status === "ACCEPTED") && (
                    <button
                      onClick={() =>
                        setReportModal({
                          open: true,
                          userId: match.donorId,
                          userName: `${match.donorFirstName} ${match.donorLastName}`,
                        })
                      }
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Şikayet Et
                    </button>
                  )}

                  {match.status === "PENDING" && (
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="danger"
                        size="sm"
                        loading={respondMutation.isPending}
                        onClick={() =>
                          respondMutation.mutate({ matchId: match.id, action: "DECLINED" })
                        }
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reddet
                      </Button>
                      <Button
                        size="sm"
                        loading={respondMutation.isPending}
                        onClick={() =>
                          respondMutation.mutate({ matchId: match.id, action: "ACCEPTED" })
                        }
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Kabul Et
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ReportModal
        open={reportModal.open}
        onClose={() => setReportModal({ open: false, userId: 0, userName: "" })}
        reportedUserId={reportModal.userId}
        reportedUserName={reportModal.userName}
      />
    </div>
  );
}
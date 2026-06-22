"use client";

import { useEffect } from "react";
import { X, User, GraduationCap, BookOpen, Star, Phone, Mail, CheckCircle, XCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { AdminUserDetail, AdminMatchSummary, MatchStatus } from "@/types";
import { useAdminUserDetail } from "@/hooks/useAdmin";
import { DEPARTMENT_CATEGORIES, GRADE_OPTIONS } from "@/constants";

const matchStatusConfig: Record<
  MatchStatus,
  { label: string; variant: "success" | "warning" | "danger" | "info" | "gray" }
> = {
  PENDING: { label: "Bekliyor", variant: "warning" },
  ACCEPTED: { label: "Kabul Edildi", variant: "success" },
  DECLINED: { label: "Reddedildi", variant: "danger" },
  EXPIRED: { label: "Süresi Doldu", variant: "gray" },
};

interface Props {
  userId: number | null;
  onClose: () => void;
}

export default function UserDrawer({ userId, onClose }: Props) {
  const { data: user, isLoading } = useAdminUserDetail(userId);

  // ESC tuşuyla kapat
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Scroll kilitle
  useEffect(() => {
    if (userId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [userId]);

  if (userId === null) return null;

  const gradeLabel = (grade: number | undefined) => {
    if (grade === undefined) return "—";
    return GRADE_OPTIONS.find((g) => g.value === String(grade))?.label ?? `${grade}. Sınıf`;
  };

  const categoryLabel = (cat: string | undefined) =>
    DEPARTMENT_CATEGORIES.find((c) => c.value === cat)?.label ?? cat ?? "—";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
        {/* Başlık */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Kullanıcı Detayı</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* İçerik */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" />
            </div>
          ) : user ? (
            <>
              {/* Kullanıcı Bilgisi */}
              <section>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-7 h-7 text-blue-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-base">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-400 truncate">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <Badge
                        label={user.role === "STUDENT" ? "Öğrenci" : user.role === "DONOR" ? "Burs Veren" : "Admin"}
                        variant={user.role === "STUDENT" ? "info" : user.role === "DONOR" ? "success" : "gray"}
                      />
                      <Badge
                        label={user.status === "ACTIVE" ? "Aktif" : user.status === "SUSPENDED" ? "Askıya Alındı" : "Doğrulama Bekliyor"}
                        variant={user.status === "ACTIVE" ? "success" : user.status === "SUSPENDED" ? "danger" : "warning"}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <InfoRow
                    label="Email Doğrulandı"
                    value={
                      user.emailVerified ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-3.5 h-3.5" /> Evet
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-500">
                          <XCircle className="w-3.5 h-3.5" /> Hayır
                        </span>
                      )
                    }
                  />
                  <InfoRow
                    label="Kayıt Tarihi"
                    value={new Date(user.createdAt).toLocaleDateString("tr-TR")}
                  />
                </div>
              </section>

              {/* Öğrenci Profili */}
              {user.role === "STUDENT" && (
                <section>
                  <SectionTitle icon={<GraduationCap className="w-4 h-4" />} title="Öğrenci Profili" />
                  {user.studentProfile ? (
                    <div className="mt-3 space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <InfoRow label="Üniversite" value={user.studentProfile.universityName ?? "—"} />
                        <InfoRow label="Şehir" value={user.studentProfile.city ?? "—"} />
                        <InfoRow label="Bölüm" value={user.studentProfile.department ?? "—"} />
                        <InfoRow label="Kategori" value={categoryLabel(user.studentProfile.departmentCategory)} />
                        <InfoRow label="Sınıf" value={gradeLabel(user.studentProfile.grade)} />
                        <InfoRow
                          label="GPA"
                          value={user.studentProfile.gpa != null ? String(user.studentProfile.gpa) : "—"}
                        />
                        <InfoRow
                          label="İletişim Tercihi"
                          value={
                            user.studentProfile.contactPreference === "EMAIL"
                              ? <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> Email</span>
                              : <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> Telefon</span>
                          }
                        />
                        <InfoRow label="İletişim Bilgisi" value={user.studentProfile.contactValue ?? "—"} />
                      </div>

                      {user.studentProfile.bio && (
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Biyografi</p>
                          <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                            {user.studentProfile.bio}
                          </p>
                        </div>
                      )}

                      {user.studentProfile.motivation && (
                        <div>
                          <p className="text-xs text-blue-400 mb-1 flex items-center gap-1">
                            <Star className="w-3 h-3" /> Motivasyon
                          </p>
                          <p className="text-sm text-blue-800 italic bg-blue-50 border border-blue-100 rounded-lg p-3">
                            "{user.studentProfile.motivation}"
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-gray-400 italic">Profil henüz tamamlanmamış.</p>
                  )}
                </section>
              )}

              {/* Eşleşmeler */}
              <section>
                <SectionTitle
                  icon={<BookOpen className="w-4 h-4" />}
                  title={`Eşleşmeler (${user.matches.length})`}
                />
                {user.matches.length === 0 ? (
                  <p className="mt-3 text-sm text-gray-400 italic">Henüz eşleşme yok.</p>
                ) : (
                  <div className="mt-3 space-y-2">
                    {user.matches.map((m: AdminMatchSummary) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg text-sm"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">{m.counterpartName}</p>
                          <p className="text-xs text-gray-400 truncate">{m.counterpartEmail}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {new Date(m.createdAt).toLocaleDateString("tr-TR")}
                          </p>
                        </div>
                        <Badge
                          label={matchStatusConfig[m.status].label}
                          variant={matchStatusConfig[m.status].variant}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </>
          ) : (
            <p className="text-sm text-gray-400 italic text-center py-20">Kullanıcı bulunamadı.</p>
          )}
        </div>
      </div>
    </>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 border-b border-gray-100 pb-2">
      <span className="text-gray-400">{icon}</span>
      {title}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm text-gray-800 font-medium mt-0.5">{value}</p>
    </div>
  );
}

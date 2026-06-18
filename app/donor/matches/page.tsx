"use client";

import { useState, useEffect } from "react";
import { User, Clock, CheckCircle, XCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import { API_ENDPOINTS } from "@/constants";
import api from "@/lib/api";
import { MatchResponse, MatchStatus } from "@/types";
import ReportModal from "@/components/ui/ReportModal";

const statusConfig: Record<
    MatchStatus,
    { label: string; variant: "success" | "warning" | "danger" | "info" | "gray" }
> = {
    PENDING: { label: "Bekliyor", variant: "warning" },
    ACCEPTED: { label: "Kabul Edildi", variant: "success" },
    DECLINED: { label: "Reddedildi", variant: "danger" },
    EXPIRED: { label: "Süresi Doldu", variant: "gray" },
};

export default function DonorMatchesPage() {
    const [matches, setMatches] = useState<MatchResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reportModal, setReportModal] = useState<{
        open: boolean;
        userId: number;
        userName: string;
    }>({ open: false, userId: 0, userName: "" });

    useEffect(() => {
        api
            .get(API_ENDPOINTS.MATCHES.DONOR)
            .then((res) => setMatches(res.data.content))
            .catch(() => setError("Eşleşmeler yüklenirken hata oluştu."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Eşleşmelerim</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Gönderdiğin burs tekliflerini buradan takip edebilirsin.
                    </p>
                </div>
                <Button onClick={() => (window.location.href = "/donor/find")}>
                    Yeni Eşleşme
                </Button>
            </div>

            {error && <Alert type="error" message={error} className="mb-6" />}

            {matches.length === 0 ? (
                <Card className="text-center py-16">
                    <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-gray-600 font-medium mb-1">
                        Henüz eşleşme yok
                    </h3>
                    <p className="text-sm text-gray-400 mb-6">
                        Bir öğrenciyle eşleşmek için başla butonuna tıkla.
                    </p>
                    <Button onClick={() => (window.location.href = "/donor/find")}>
                        Eşleşme Bul
                    </Button>
                </Card>
            ) : (
                <div className="flex flex-col gap-4">
                    {matches.map((match) => (
                        <Card key={match.id}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-blue-700" />
                                </div>
                                <div>
                                    {match.status === "ACCEPTED" ? (
                                        <>
                                            <p className="font-medium text-gray-900">
                                                {match.studentFirstName} {match.studentLastName}
                                            </p>
                                            <p className="text-sm text-gray-400">{match.studentEmail}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="font-medium text-gray-500 italic">Kimlik Gizli</p>
                                            <p className="text-xs text-gray-400">
                                                Öğrenci kabul ederse bilgiler görünür
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {match.donorMessage && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-400 mb-1">Mesajın</p>
                                    <p className="text-sm text-gray-600 italic">
                                        "{match.donorMessage}"
                                    </p>
                                </div>
                            )}

                            {match.status === "ACCEPTED" && match.contactValue && (
                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-sm font-medium text-green-700 mb-1">
                                        ✅ Öğrenci teklifi kabul etti!
                                    </p>
                                    <p className="text-sm text-green-600">
                                        {match.contactPreference}: {match.contactValue}
                                    </p>
                                </div>
                            )}

                            {match.status === "ACCEPTED" && (
                                <button
                                    onClick={() =>
                                        setReportModal({
                                            open: true,
                                            userId: match.studentId,
                                            userName: `${match.studentFirstName} ${match.studentLastName}`,
                                        })
                                    }
                                    className="text-xs text-gray-400 hover:text-red-500 transition-colors mt-2"
                                >
                                    Bu kullanıcıyı şikayet et
                                </button>
                            )}

                            <ReportModal
                                open={reportModal.open}
                                onClose={() => setReportModal({ open: false, userId: 0, userName: "" })}
                                reportedUserId={reportModal.userId}
                                reportedUserName={reportModal.userName}
                            />

                            {match.status === "PENDING" && (
                                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-sm text-yellow-700">
                                        ⏳ Öğrencinin yanıt vermesi bekleniyor. Son tarih:{" "}
                                        {new Date(match.expiresAt).toLocaleDateString("tr-TR")}
                                    </p>
                                </div>
                            )}

                            {match.status === "DECLINED" && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-700">
                                        ❌ Öğrenci teklifi reddetti.
                                        {match.respondedAt && (
                                            <span className="text-red-500 ml-1">
                                                ({new Date(match.respondedAt).toLocaleDateString("tr-TR")})
                                            </span>
                                        )}
                                    </p>
                                </div>
                            )}

                            <p className="text-xs text-gray-400 mt-4">
                                {new Date(match.createdAt).toLocaleDateString("tr-TR")}
                            </p>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
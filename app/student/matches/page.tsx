"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, User } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Alert from "@/components/ui/Alert";
import { API_ENDPOINTS } from "@/constants";
import api from "@/lib/api";
import { MatchResponse, MatchStatus } from "@/types";

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
    const [matches, setMatches] = useState<MatchResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [responding, setResponding] = useState<number | null>(null);

    const fetchMatches = async () => {
        try {
            const res = await api.get(API_ENDPOINTS.MATCHES.STUDENT);
            setMatches(res.data.content);
        } catch {
            setError("Eşleşmeler yüklenirken hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    const handleRespond = async (matchId: number, action: "ACCEPTED" | "DECLINED") => {
        setResponding(matchId);
        try {
            await api.put(API_ENDPOINTS.MATCHES.RESPOND(matchId), { action });
            await fetchMatches();
        } catch (err: any) {
            setError(err.response?.data?.message || "Bir hata oluştu.");
        } finally {
            setResponding(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Burs Teklifleri</h1>
                <p className="text-gray-500 text-sm mt-1">
                    Sana gelen burs tekliflerini burada görebilirsin.
                </p>
            </div>

            {error && <Alert type="error" message={error} className="mb-6" />}

            {matches.length === 0 ? (
                <Card className="text-center py-16">
                    <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-gray-600 font-medium mb-1">
                        Henüz bir teklif yok
                    </h3>
                    <p className="text-sm text-gray-400">
                        Profilini doldurduktan sonra burs verenler seni keşfedebilir.
                    </p>
                </Card>
            ) : (
                <div className="flex flex-col gap-4">
                    {matches.map((match) => (
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
                                    <p className="text-sm font-medium text-green-700 mb-1">
                                        İletişim Bilgisi
                                    </p>
                                    <p className="text-sm text-green-600">
                                        {match.contactPreference}: {match.contactValue}
                                    </p>
                                </div>
                            )}

                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-xs text-gray-400">
                                    {new Date(match.createdAt).toLocaleDateString("tr-TR")}
                                </p>

                                {match.status === "PENDING" && (
                                    <div className="flex gap-2">
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            loading={responding === match.id}
                                            onClick={() => handleRespond(match.id, "DECLINED")}
                                        >
                                            <XCircle className="w-4 h-4 mr-1" />
                                            Reddet
                                        </Button>
                                        <Button
                                            size="sm"
                                            loading={responding === match.id}
                                            onClick={() => handleRespond(match.id, "ACCEPTED")}
                                        >
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Kabul Et
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
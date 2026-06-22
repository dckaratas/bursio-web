"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { ROUTES, API_ENDPOINTS } from "@/constants";
import { saveAuth } from "@/lib/auth";
import api from "@/lib/api";
import { AuthResponse } from "@/types";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendEmail, setResendEmail] = useState("");
    const [resendLoading, setResendLoading] = useState(false);
    const [resendSuccess, setResendSuccess] = useState("");
    const [resendError, setResendError] = useState("");
    const [showResend, setShowResend] = useState(false);
    const [showReverification, setShowReverification] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
                email,
                password,
            });

            saveAuth(res.data.token, res.data.role, res.data.email);
            if (res.data.role === "STUDENT") {
                try {
                    const profileRes = await api.get(API_ENDPOINTS.STUDENT.PROFILE);
                    if (profileRes.data.profileComplete) {
                        window.location.href = ROUTES.STUDENT.MATCHES;
                    } else {
                        window.location.href = ROUTES.STUDENT.PROFILE;
                    }
                } catch {
                    // Profil yok
                    window.location.href = ROUTES.STUDENT.PROFILE;
                }
            }
            else if (res.data.role === "DONOR") window.location.href = ROUTES.DONOR.MATCHES;
            else if (res.data.role === "ADMIN") window.location.href = ROUTES.ADMIN.DASHBOARD;
        } catch (err: any) {
            if (err.response?.data?.code === "EMAIL_REVERIFICATION_REQUIRED") {
                setShowReverification(true);
                setError("");
            } else {
                setError(
                    err.response?.data?.message || "Giriş yapılırken bir hata oluştu."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async (e: React.FormEvent) => {
        e.preventDefault();
        setResendError("");
        setResendSuccess("");
        setResendLoading(true);

        try {
            const res = await api.post(
                `/api/auth/resend-verification?email=${encodeURIComponent(resendEmail)}`
            );
            setResendSuccess(res.data.message);
        } catch (err: any) {
            setResendError(
                err.response?.data?.message || "Bir hata oluştu."
            );
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Tekrar Hoş Geldin</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Hesabına giriş yap
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                    {error && (
                        <Alert type="error" message={error} className="mb-6" />
                    )}

                    {showReverification && (
                        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm font-medium text-yellow-800 mb-1">
                                Yıllık email doğrulaması gerekiyor
                            </p>
                            <p className="text-sm text-yellow-700">
                                Üniversite e-postanıza doğrulama linki gönderildi. Linke tıkladıktan sonra tekrar giriş yapabilirsiniz.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="ornek@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                        <Input
                            label="Şifre"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />

                        <div className="flex justify-end">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-gray-400 hover:text-blue-700 transition-colors"
                            >
                                Şifremi unuttum
                            </Link>
                        </div>

                        <Button type="submit" fullWidth loading={loading} size="lg">
                            Giriş Yap
                        </Button>
                    </form>
                </div>

                {/* Doğrulama emaili yeniden gönder */}
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={() => setShowResend(!showResend)}
                        className="text-sm text-gray-400 hover:text-blue-700 transition-colors"
                    >
                        Doğrulama emaili gelmedi mi?
                    </button>
                </div>

                {showResend && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-3">
                            Email adresinizi girin, yeni doğrulama linki gönderelim.
                        </p>

                        {resendSuccess && (
                            <Alert type="success" message={resendSuccess} className="mb-3" />
                        )}
                        {resendError && (
                            <Alert type="error" message={resendError} className="mb-3" />
                        )}

                        <form onSubmit={handleResend} className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email adresiniz"
                                value={resendEmail}
                                onChange={(e) => setResendEmail(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <Button type="submit" size="sm" loading={resendLoading}>
                                Gönder
                            </Button>
                        </form>
                    </div>
                )}
                {/* Alt link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Hesabın yok mu?{" "}
                    <Link
                        href={ROUTES.REGISTER}
                        className="text-blue-700 font-medium hover:underline"
                    >
                        Kayıt Ol
                    </Link>
                </p>
            </div>
        </div>
    );
}
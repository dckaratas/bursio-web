"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { ROUTES } from "@/constants";
import api from "@/lib/api";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/api/auth/reset-password", {
        token,
        newPassword,
      });
      setSuccess(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Yeni Şifre Belirle</h1>
          <p className="text-gray-500 text-sm mt-1">
            En az 8 karakter uzunluğunda bir şifre girin.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          {!token ? (
            <Alert type="error" message="Geçersiz şifre sıfırlama linki." />
          ) : success ? (
            <div className="text-center flex flex-col gap-4">
              <Alert type="success" message={success} />
              <Link
                href={ROUTES.LOGIN}
                className="text-sm text-blue-700 hover:underline font-medium"
              >
                Giriş yap
              </Link>
            </div>
          ) : (
            <>
              {error && <Alert type="error" message={error} className="mb-4" />}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Yeni Şifre"
                  type="password"
                  placeholder="En az 8 karakter"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <Input
                  label="Şifre Tekrar"
                  type="password"
                  placeholder="Şifrenizi tekrar girin"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button type="submit" fullWidth size="lg" loading={loading}>
                  Şifremi Güncelle
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
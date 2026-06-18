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

      if (res.data.role === "STUDENT") router.push(ROUTES.STUDENT.MATCHES);
      else if (res.data.role === "DONOR") router.push(ROUTES.DONOR.MATCHES);
      else if (res.data.role === "ADMIN") router.push(ROUTES.ADMIN.DASHBOARD);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Giriş yapılırken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
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

            <Button type="submit" fullWidth loading={loading} size="lg">
              Giriş Yap
            </Button>
          </form>
        </div>

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
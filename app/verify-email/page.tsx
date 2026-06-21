"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { ROUTES, API_ENDPOINTS } from "@/constants";
import api from "@/lib/api";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Geçersiz doğrulama linki.");
      return;
    }

    api
      .get(`${API_ENDPOINTS.AUTH.VERIFY_EMAIL}?token=${token}`)
      .then((res) => {
        setStatus("success");
        setMessage(res.data.message);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(
          err.response?.data?.message || "Doğrulama başarısız oldu."
        );
      });
  }, [token]);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10">
          {status === "loading" && (
            <>
              <Loader className="w-12 h-12 text-blue-700 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Email doğrulanıyor...</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Email Doğrulandı!
              </h2>
              <p className="text-gray-500 mb-6">{message}</p>
              <Link
                href={ROUTES.LOGIN}
                className="bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
              >
                Giriş Yap
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Doğrulama Başarısız
              </h2>
              <p className="text-gray-500 mb-6">{message}</p>
              <Link
                href={ROUTES.REGISTER}
                className="bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
              >
                Tekrar Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <Loader className="w-8 h-8 text-blue-700 animate-spin" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { ROUTES } from "@/constants";

export default function VerifyEmailSuccessPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Email Doğrulandı!
          </h2>
          <p className="text-gray-500 mb-6">
            Hesabınız başarıyla doğrulandı. Giriş yapabilirsiniz.
          </p>
          <Link
            href={ROUTES.LOGIN}
            className="bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
}
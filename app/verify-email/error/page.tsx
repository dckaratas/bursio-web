import Link from "next/link";
import { XCircle } from "lucide-react";
import { ROUTES } from "@/constants";

export default function VerifyEmailErrorPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Doğrulama Başarısız
          </h2>
          <p className="text-gray-500 mb-6">
            Doğrulama linki geçersiz veya süresi dolmuş olabilir.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href={ROUTES.LOGIN}
              className="bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              Giriş Yap
            </Link>
            <p className="text-sm text-gray-400">
              Yeni doğrulama emaili almak için giriş sayfasındaki{" "}
              <Link href={ROUTES.LOGIN} className="text-blue-700 hover:underline">
                "Doğrulama emaili gelmedi mi?"
              </Link>{" "}
              seçeneğini kullanabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
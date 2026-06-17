"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearAuth, getRole, isAuthenticated } from "@/lib/auth";
import { ROUTES } from "@/constants";
import { LogOut, User, GraduationCap } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const authenticated = isAuthenticated();
  const role = getRole();

  const handleLogout = () => {
    clearAuth();
    router.push(ROUTES.LOGIN);
  };

  const getDashboardLink = () => {
    if (role === "STUDENT") return ROUTES.STUDENT.MATCHES;
    if (role === "DONOR") return ROUTES.DONOR.MATCHES;
    if (role === "ADMIN") return ROUTES.ADMIN.DASHBOARD;
    return ROUTES.HOME;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-blue-700">BursIO</span>
        </Link>

        {/* Sağ taraf */}
        <div className="flex items-center gap-3">
          {authenticated ? (
            <>
              <Link
                href={getDashboardLink()}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Panelim</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Çıkış</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href={ROUTES.LOGIN}
                className="text-sm text-gray-600 hover:text-blue-700 transition-colors"
              >
                Giriş Yap
              </Link>
              <Link
                href={ROUTES.REGISTER}
                className="text-sm bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
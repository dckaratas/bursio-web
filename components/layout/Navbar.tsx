"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAuth, getRole, isAuthenticated } from "@/lib/auth";
import { ROUTES } from "@/constants";
import { LogOut, GraduationCap, LayoutDashboard, Search, List, User, Flag, University, Users } from "lucide-react";
import type { Role } from "@/types";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const roleLinks: Record<string, NavLink[]> = {
  STUDENT: [
    { href: ROUTES.STUDENT.PROFILE, label: "Profilim", icon: <User className="w-4 h-4" /> },
    { href: ROUTES.STUDENT.MATCHES, label: "Tekliflerim", icon: <List className="w-4 h-4" /> },
  ],
  DONOR: [
    { href: ROUTES.DONOR.FIND, label: "Eşleşme Bul", icon: <Search className="w-4 h-4" /> },
    { href: ROUTES.DONOR.MATCHES, label: "Eşleşmelerim", icon: <List className="w-4 h-4" /> },
  ],
  ADMIN: [
    { href: ROUTES.ADMIN.DASHBOARD, label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: ROUTES.ADMIN.USERS, label: "Kullanıcılar", icon: <Users className="w-4 h-4" /> },
    { href: ROUTES.ADMIN.REPORTS, label: "Şikayetler", icon: <Flag className="w-4 h-4" /> },
    { href: ROUTES.ADMIN.UNIVERSITIES, label: "Üniversiteler", icon: <University className="w-4 h-4" /> },
  ],
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState<Role | undefined>();

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setRole(getRole());
  }, [pathname]);

  const handleLogout = () => {
    clearAuth();
    setAuthenticated(false);
    setRole(undefined);
    router.push(ROUTES.LOGIN);
  };

  const links = role ? roleLinks[role] ?? [] : [];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-blue-700">BursIO</span>
        </Link>

        {/* Orta linkler */}
        {authenticated && links.length > 0 && (
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors
                  ${pathname === link.href
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Sağ taraf */}
        <div className="flex items-center gap-3">
          {authenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Çıkış</span>
            </button>
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
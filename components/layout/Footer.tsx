import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-blue-700">BursIO</span>
          </div>

          {/* Linkler */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/hakkinda" className="hover:text-blue-700 transition-colors">
              Hakkında
            </Link>
            <Link href="/gizlilik" className="hover:text-blue-700 transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/iletisim" className="hover:text-blue-700 transition-colors">
              İletişim
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} BursIO
          </p>
        </div>
      </div>
    </footer>
  );
}
"use client";

import Link from "next/link";
import { Users, Flag, University, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import { ROUTES } from "@/constants";
import { useAdminStats } from "@/hooks/useAdmin";

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useAdminStats();

  const cards = [
    {
      title: "Toplam Kullanıcı",
      value: stats?.totalUsers ?? 0,
      icon: <Users className="w-6 h-6 text-blue-700" />,
      bg: "bg-blue-50",
      href: ROUTES.ADMIN.USERS,
    },
    {
      title: "Açık Şikayetler",
      value: stats?.openReports ?? 0,
      icon: <Flag className="w-6 h-6 text-red-600" />,
      bg: "bg-red-50",
      href: ROUTES.ADMIN.REPORTS,
    },
    {
      title: "Üniversiteler",
      value: stats?.totalUniversities ?? 0,
      icon: <University className="w-6 h-6 text-green-600" />,
      bg: "bg-green-50",
      href: ROUTES.ADMIN.UNIVERSITIES,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Paneli</h1>
        <p className="text-gray-500 text-sm mt-1">Platform yönetimi</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {isLoading ? "—" : card.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center`}>
                  {card.icon}
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4 text-sm text-blue-700">
                <span>Yönet</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
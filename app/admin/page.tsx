"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Flag, University, ArrowRight, AlertTriangle } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants";
import { useAdminStats, useAdminMaintenance, useSetMaintenance } from "@/hooks/useAdmin";

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useAdminStats();
  const { data: maintenance } = useAdminMaintenance();
  const setMaintenance = useSetMaintenance();

  const [maintenanceMsg, setMaintenanceMsg] = useState("");

  useEffect(() => {
    if (maintenance?.message) {
      setMaintenanceMsg(maintenance.message);
    }
  }, [maintenance?.message]);

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

  const handleToggleMaintenance = () => {
    setMaintenance.mutate({
      active: !maintenance?.active,
      message: maintenanceMsg,
    });
  };

  const handleSaveMessage = () => {
    setMaintenance.mutate({
      active: maintenance?.active ?? false,
      message: maintenanceMsg,
    });
  };

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

      {/* Bakım Modu */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Bakım Modu</h2>
        <Card>
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${maintenance?.active ? "bg-amber-100" : "bg-gray-100"}`}>
              <AlertTriangle className={`w-5 h-5 ${maintenance?.active ? "text-amber-600" : "text-gray-400"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4 mb-1">
                <div>
                  <p className="font-medium text-gray-900">Bakım / Acil Durum Modu</p>
                  <p className="text-sm text-gray-500">
                    {maintenance?.active
                      ? "Aktif — Yeni kayıtlar engellendi, kullanıcılara bildirim gösteriliyor."
                      : "Pasif — Sistem normal çalışıyor."}
                  </p>
                </div>
                <Button
                  variant={maintenance?.active ? "danger" : "primary"}
                  size="sm"
                  loading={setMaintenance.isPending}
                  onClick={handleToggleMaintenance}
                >
                  {maintenance?.active ? "Kapat" : "Aktifleştir"}
                </Button>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kullanıcılara gösterilecek mesaj
                </label>
                <textarea
                  value={maintenanceMsg}
                  onChange={(e) => setMaintenanceMsg(e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="mt-2 flex justify-end">
                  <Button
                    variant="secondary"
                    size="sm"
                    loading={setMaintenance.isPending}
                    onClick={handleSaveMessage}
                  >
                    Mesajı Kaydet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

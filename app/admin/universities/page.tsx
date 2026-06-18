"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Input from "@/components/ui/Input";
import {
  useAdminUniversities,
  useAddUniversity,
  useToggleUniversity,
} from "@/hooks/useAdmin";

export default function AdminUniversitiesPage() {
  const [page, setPage] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUni, setNewUni] = useState({ name: "", city: "", emailDomains: "" });

  const { data, isLoading, error } = useAdminUniversities(page);
  const addMutation = useAddUniversity();
  const toggleMutation = useToggleUniversity();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    addMutation.mutate(
      {
        name: newUni.name,
        city: newUni.city,
        emailDomains: newUni.emailDomains
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean),
      },
      {
        onSuccess: () => {
          setShowAddForm(false);
          setNewUni({ name: "", city: "", emailDomains: "" });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Üniversiteler</h1>
          <p className="text-gray-500 text-sm mt-1">
            Toplam {data?.totalElements ?? 0} üniversite
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-1" />
          Ekle
        </Button>
      </div>

      {error && (
        <Alert type="error" message="Üniversiteler yüklenirken hata oluştu." className="mb-4" />
      )}

      {addMutation.isError && (
        <Alert type="error" message="Üniversite eklenirken hata oluştu." className="mb-4" />
      )}

      {addMutation.isSuccess && (
        <Alert type="success" message="Üniversite başarıyla eklendi." className="mb-4" />
      )}

      {showAddForm && (
        <Card className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Yeni Üniversite Ekle</h3>
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Üniversite Adı"
                value={newUni.name}
                onChange={(e) => setNewUni({ ...newUni, name: e.target.value })}
                placeholder="Örn: Ankara Üniversitesi"
                required
              />
              <Input
                label="Şehir"
                value={newUni.city}
                onChange={(e) => setNewUni({ ...newUni, city: e.target.value })}
                placeholder="Örn: Ankara"
                required
              />
            </div>
            <Input
              label="Email Domain'leri"
              value={newUni.emailDomains}
              onChange={(e) => setNewUni({ ...newUni, emailDomains: e.target.value })}
              placeholder="ogr.ankara.edu.tr, ankara.edu.tr"
              hint="Birden fazla domain virgülle ayır"
              required
            />
            <div className="flex gap-3">
              <Button type="submit" loading={addMutation.isPending}>
                Kaydet
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowAddForm(false)}
              >
                İptal
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="flex flex-col gap-3">
        {data?.content.map((uni: any) => (
          <Card key={uni.id} padding="sm">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-900">{uni.name}</p>
                  <Badge
                    label={uni.active ? "Aktif" : "Pasif"}
                    variant={uni.active ? "success" : "gray"}
                  />
                </div>
                <p className="text-sm text-gray-400">{uni.city}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {uni.emailDomains.map((domain: string) => (
                    <span
                      key={domain}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                    >
                      @{domain}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                variant={uni.active ? "danger" : "secondary"}
                size="sm"
                loading={toggleMutation.isPending}
                onClick={() => toggleMutation.mutate(uni.id)}
              >
                {uni.active ? "Pasif Yap" : "Aktif Et"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="secondary"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Önceki
          </Button>
          <p className="text-sm text-gray-500">
            {page + 1} / {data.totalPages}
          </p>
          <Button
            variant="secondary"
            size="sm"
            disabled={data.last}
            onClick={() => setPage(page + 1)}
          >
            Sonraki
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
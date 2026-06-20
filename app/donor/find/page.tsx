"use client";

import { useState } from "react";
import { Shuffle } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import { ROUTES, API_ENDPOINTS, DEPARTMENT_CATEGORIES, GRADE_OPTIONS } from "@/constants";
import { useCreateRandomMatch } from "@/hooks/useMatches";
import api from "@/lib/api";
import { University } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function DonorFindPage() {
  const [success, setSuccess] = useState(false);
  const [filter, setFilter] = useState({
    universityId: "",
    departmentCategory: "",
    minGrade: "",
    maxGrade: "",
    minGpa: "",
    donorMessage: "",
  });

  const { data: universities = [] } = useQuery({
    queryKey: ["universities"],
    queryFn: async () => {
      const res = await api.get<{ content: University[] }>(
        API_ENDPOINTS.UNIVERSITIES,
        { params: { size: 100 } }
      );
      return res.data.content;
    },
    staleTime: 60 * 60 * 1000,
  });

  const createMatchMutation = useCreateRandomMatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createMatchMutation.mutate(
      {
        universityId: filter.universityId ? Number(filter.universityId) : null,
        departmentCategory: filter.departmentCategory || null,
        minGrade: filter.minGrade ? Number(filter.minGrade) : null,
        maxGrade: filter.maxGrade ? Number(filter.maxGrade) : null,
        minGpa: filter.minGpa ? Number(filter.minGpa) : null,
        donorMessage: filter.donorMessage || null,
      },
      {
        onSuccess: () => setSuccess(true),
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Eşleşme Bul</h1>
        <p className="text-gray-500 text-sm mt-1">
          Filtreni belirle, sistem uygun bir öğrenciyle seni eşleştirsin.
        </p>
      </div>

      {success && (
        <div className="mb-6">
          <Alert
            type="success"
            message="Eşleşme talebi oluşturuldu! Öğrenci kabul ederse seni bilgilendireceğiz."
          />
          <div className="mt-4 flex gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setSuccess(false);
                createMatchMutation.reset();
                setFilter({
                  universityId: "",
                  departmentCategory: "",
                  minGrade: "",
                  maxGrade: "",
                  minGpa: "",
                  donorMessage: "",
                });
              }}
            >
              Yeni Eşleşme
            </Button>
            <Button onClick={() => (window.location.href = ROUTES.DONOR.MATCHES)}>
              Eşleşmelerimi Gör
            </Button>
          </div>
        </div>
      )}

      {!success && (
        <Card>
          {createMatchMutation.isError && (
            <Alert
              type="error"
              message={(createMatchMutation.error as any)?.response?.data?.message || "Bir hata oluştu."}
              className="mb-6"
            />
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 Tüm filtreler isteğe bağlıdır. Boş bırakırsan tüm öğrenciler
                arasından rastgele seçim yapılır.
              </p>
            </div>

            <Select
              label="Üniversite"
              name="universityId"
              value={filter.universityId}
              onChange={handleChange}
              placeholder="Tüm üniversiteler"
              clearable
              onClear={() => setFilter({ ...filter, universityId: "" })}
              options={universities.map((u: University) => ({
                value: u.id.toString(),
                label: `${u.name} — ${u.city}`,
              }))}
            />

            <Select
              label="Bölüm Kategorisi"
              name="departmentCategory"
              value={filter.departmentCategory}
              onChange={handleChange}
              placeholder="Tüm kategoriler"
              clearable
              onClear={() => setFilter({ ...filter, departmentCategory: "" })}
              options={DEPARTMENT_CATEGORIES.map(c => ({
                value: c.value,
                label: c.label,
              }))}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Min Sınıf"
                name="minGrade"
                value={filter.minGrade}
                onChange={handleChange}
                placeholder="Fark etmez"
                clearable
                onClear={() => setFilter({ ...filter, minGrade: "" })}
                options={GRADE_OPTIONS.map(g => ({ value: g.value, label: g.label }))}
              />
              <Select
                label="Max Sınıf"
                name="maxGrade"
                value={filter.maxGrade}
                onChange={handleChange}
                placeholder="Fark etmez"
                clearable
                onClear={() => setFilter({ ...filter, maxGrade: "" })}
                options={GRADE_OPTIONS.map(g => ({ value: g.value, label: g.label }))}
              />
            </div>

            <Input
              label="Min GPA"
              name="minGpa"
              type="number"
              placeholder="Örn: 2.50"
              min="0"
              max="4"
              step="0.01"
              value={filter.minGpa}
              onChange={handleChange}
              hint="0.00 - 4.00 arası"
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Öğrenciye Mesaj
              </label>
              <textarea
                name="donorMessage"
                value={filter.donorMessage}
                onChange={handleChange}
                rows={3}
                maxLength={500}
                placeholder="Öğrenciye iletmek istediğin bir mesaj var mı?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={createMatchMutation.isPending}
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Rastgele Eşleş
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
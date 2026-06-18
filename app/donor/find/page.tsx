"use client";

import { useState, useEffect } from "react";
import { Shuffle } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import { API_ENDPOINTS, ROUTES } from "@/constants";
import api from "@/lib/api";
import { University } from "@/types";

export default function DonorFindPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [filter, setFilter] = useState({
    universityId: "",
    department: "",
    minGrade: "",
    maxGrade: "",
    minGpa: "",
    donorMessage: "",
  });

  useEffect(() => {
    api
      .get(API_ENDPOINTS.UNIVERSITIES, { params: { size: 100 } })
      .then((res) => setUniversities(res.data.content))
      .catch(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post(API_ENDPOINTS.MATCHES.RANDOM, {
        universityId: filter.universityId ? Number(filter.universityId) : null,
        department: filter.department || null,
        minGrade: filter.minGrade ? Number(filter.minGrade) : null,
        maxGrade: filter.maxGrade ? Number(filter.maxGrade) : null,
        minGpa: filter.minGpa ? Number(filter.minGpa) : null,
        donorMessage: filter.donorMessage || null,
      });

      setSuccess(
        "Eşleşme talebi oluşturuldu! Öğrenci kabul ederse seni bilgilendireceğiz."
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
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
          <Alert type="success" message={success} />
          <div className="mt-4 flex gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setSuccess("");
                setFilter({
                  universityId: "",
                  department: "",
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
          {error && <Alert type="error" message={error} className="mb-6" />}

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
              options={universities.map((u) => ({
                value: u.id.toString(),
                label: `${u.name} — ${u.city}`,
              }))}
            />

            <Input
              label="Bölüm"
              name="department"
              placeholder="Örn: Bilgisayar Mühendisliği"
              value={filter.department}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Min Sınıf"
                name="minGrade"
                value={filter.minGrade}
                onChange={handleChange}
                placeholder="Fark etmez"
                options={[
                  { value: "1", label: "1. Sınıf" },
                  { value: "2", label: "2. Sınıf" },
                  { value: "3", label: "3. Sınıf" },
                  { value: "4", label: "4. Sınıf" },
                ]}
              />
              <Select
                label="Max Sınıf"
                name="maxGrade"
                value={filter.maxGrade}
                onChange={handleChange}
                placeholder="Fark etmez"
                options={[
                  { value: "1", label: "1. Sınıf" },
                  { value: "2", label: "2. Sınıf" },
                  { value: "3", label: "3. Sınıf" },
                  { value: "4", label: "4. Sınıf" },
                ]}
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
              loading={loading}
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
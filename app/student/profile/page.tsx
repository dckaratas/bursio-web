"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";
import { API_ENDPOINTS, ROUTES } from "@/constants";
import api from "@/lib/api";
import { University, StudentProfile } from "@/types";

export default function StudentProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    department: "",
    grade: "",
    gpa: "",
    bio: "",
    motivation: "",
    contactPreference: "",
    contactValue: "",
  });
  const [universityName, setUniversityName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {

        // Mevcut profili çek
        try {
          const profileRes = await api.get<StudentProfile>(
            API_ENDPOINTS.STUDENT.PROFILE
          );
          const p = profileRes.data;
          setUniversityName(p.universityName || "");
          setForm({
            department: p.department || "",
            grade: p.grade?.toString() || "",
            gpa: p.gpa?.toString() || "",
            bio: p.bio || "",
            motivation: p.motivation || "",
            contactPreference: p.contactPreference || "",
            contactValue: p.contactValue || "",
          });
        } catch {
          // Profil henüz yok, form boş kalır
        }
      } catch {
        setError("Veriler yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await api.put(API_ENDPOINTS.STUDENT.PROFILE, {
        department: form.department,
        grade: Number(form.grade),
        gpa: form.gpa ? Number(form.gpa) : null,
        bio: form.bio,
        motivation: form.motivation,
        contactPreference: form.contactPreference,
        contactValue: form.contactValue,
      });
      setSuccess("Profilin başarıyla güncellendi.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profilim</h1>
        <p className="text-gray-500 text-sm mt-1">
          Bilgilerini doldur, burs verenler seni keşfedebilsin.
        </p>
      </div>

      {success && <Alert type="success" message={success} className="mb-6" />}
      {error && <Alert type="error" message={error} className="mb-6" />}

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Üniversite</label>
            <div className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-600">
              {universityName || "Üniversite bilgisi bulunamadı"}
            </div>
            <p className="text-xs text-gray-400">
              Üniversiteniz email adresinizden otomatik belirlenir.
            </p>
          </div>

          <Input
            label="Bölüm"
            name="department"
            placeholder="Bilgisayar Mühendisliği"
            value={form.department}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Sınıf"
              name="grade"
              value={form.grade}
              onChange={handleChange}
              placeholder="Sınıf seç"
              options={[
                { value: "1", label: "1. Sınıf" },
                { value: "2", label: "2. Sınıf" },
                { value: "3", label: "3. Sınıf" },
                { value: "4", label: "4. Sınıf" },
                { value: "5", label: "5. Sınıf" },
                { value: "6", label: "6. Sınıf (Yüksek Lisans)" },
              ]}
              required
            />
            <Input
              label="Not Ortalaması (GPA)"
              name="gpa"
              type="number"
              placeholder="3.20"
              min="0"
              max="4"
              step="0.01"
              value={form.gpa}
              onChange={handleChange}
              hint="0.00 - 4.00 arası"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Kendini Tanıt <span className="text-red-500">*</span>
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              maxLength={500}
              placeholder="Kendin hakkında kısa bir bilgi ver..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
            <p className="text-xs text-gray-400 text-right">
              {form.bio.length}/500
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Motivasyon <span className="text-red-500">*</span>
            </label>
            <textarea
              name="motivation"
              value={form.motivation}
              onChange={handleChange}
              rows={4}
              maxLength={1000}
              placeholder="Neden burs almak istiyorsun?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
            <p className="text-xs text-gray-400 text-right">
              {form.motivation.length}/1000
            </p>
          </div>

          <Select
            label="İletişim Tercihi"
            name="contactPreference"
            value={form.contactPreference}
            onChange={handleChange}
            placeholder="Nasıl ulaşılsın?"
            options={[
              { value: "EMAIL", label: "Email" },
              { value: "PHONE", label: "Telefon" },
            ]}
            required
          />

          <Input
            label="İletişim Bilgisi"
            name="contactValue"
            placeholder={
              form.contactPreference === "PHONE"
                ? "05XX XXX XX XX"
                : "ornek@mail.com"
            }
            value={form.contactValue}
            onChange={handleChange}
            hint="Bu bilgi sadece eşleşme kabul edildiğinde paylaşılır."
            required
          />

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={saving} fullWidth size="lg">
              Profili Kaydet
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
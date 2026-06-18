"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { ROUTES, API_ENDPOINTS } from "@/constants";
import api from "@/lib/api";

type Role = "STUDENT" | "DONOR";

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("STUDENT");
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    privacyPolicyAccepted: false,
    termsAccepted: false,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmailChange, setShowEmailChange] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [changeLoading, setChangeLoading] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState("");
  const [changeError, setChangeError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await api.post(API_ENDPOINTS.AUTH.REGISTER, {
        ...form,
        role,
      });
      setSuccess(res.data.message);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Kayıt olurken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangeError("");
    setChangeSuccess("");
    setChangeLoading(true);

    try {
      const res = await api.put("/api/auth/change-email", {
        currentEmail: form.email,
        newEmail,
      });
      setChangeSuccess(res.data.message);
      setShowEmailChange(false);
      // Formdaki emaili güncelle ki tekrar değişiklik yapılabilsin
      setForm({ ...form, email: newEmail });
      setNewEmail("");
    } catch (err: any) {
      setChangeError(
        err.response?.data?.message || "Bir hata oluştu."
      );
    } finally {
      setChangeLoading(false);
    }
  };
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Hesap Oluştur</h1>
          <p className="text-gray-500 text-sm mt-1">
            BursIO'ya ücretsiz katıl
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          {success ? (
            <div className="text-center py-4 flex flex-col gap-4">
              <Alert type="success" message={changeSuccess || success} />

              {!showEmailChange ? (
                <>
                  <p className="text-sm text-gray-500">
                    Email doğrulama linkine tıkladıktan sonra{" "}
                    <Link
                      href={ROUTES.LOGIN}
                      className="text-blue-700 font-medium hover:underline"
                    >
                      giriş yapabilirsin.
                    </Link>
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowEmailChange(true)}
                    className="text-sm text-gray-400 hover:text-blue-700 transition-colors"
                  >
                    Email adresini yanlış mı girdin?
                  </button>
                </>
              ) : (
                <div className="text-left">
                  <p className="text-sm text-gray-600 mb-3">
                    Yeni email adresini gir, doğrulama linkini oraya gönderelim.
                  </p>

                  {changeError && (
                    <Alert type="error" message={changeError} className="mb-3" />
                  )}

                  <form onSubmit={handleEmailChange} className="flex flex-col gap-3">
                    <Input
                      label="Yeni Email"
                      type="email"
                      placeholder={
                        role === "STUDENT"
                          ? "ornek@ogr.uni.edu.tr"
                          : "ornek@gmail.com"
                      }
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      required
                    />
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        fullWidth
                        onClick={() => setShowEmailChange(false)}
                      >
                        İptal
                      </Button>
                      <Button
                        type="submit"
                        fullWidth
                        loading={changeLoading}
                      >
                        Güncelle
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <>
              {error && <Alert type="error" message={error} className="mb-6" />}

              {/* Rol seçimi */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setRole("STUDENT")}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${role === "STUDENT"
                    ? "border-blue-700 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                >
                  🎓 Öğrenciyim
                </button>
                <button
                  type="button"
                  onClick={() => setRole("DONOR")}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${role === "DONOR"
                    ? "border-blue-700 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                >
                  💙 Burs Vermek İstiyorum
                </button>
              </div>

              {role === "STUDENT" && (
                <Alert
                  type="info"
                  message="Öğrenci kaydı için üniversite email adresiniz gereklidir (.edu.tr)"
                  className="mb-5"
                />
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Ad"
                    name="firstName"
                    placeholder="Ali"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Soyad"
                    name="lastName"
                    placeholder="Kaya"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder={
                    role === "STUDENT"
                      ? "ornek@ogr.uni.edu.tr"
                      : "ornek@gmail.com"
                  }
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Şifre"
                  type="password"
                  name="password"
                  placeholder="En az 8 karakter"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                {/* Onay checkboxları */}
                <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.privacyPolicyAccepted}
                      onChange={(e) =>
                        setForm({ ...form, privacyPolicyAccepted: e.target.checked })
                      }
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-600">
                      <Link href="/gizlilik" target="_blank" className="text-blue-700 hover:underline font-medium">
                        Gizlilik Politikası
                      </Link>
                      'nı ve{" "}
                      <Link href="/kvkk" target="_blank" className="text-blue-700 hover:underline font-medium">
                        KVKK Aydınlatma Metni
                      </Link>
                      'ni okudum, kabul ediyorum.{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.termsAccepted}
                      onChange={(e) =>
                        setForm({ ...form, termsAccepted: e.target.checked })
                      }
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-600">
                      <Link href="/kullanim-kosullari" target="_blank" className="text-blue-700 hover:underline font-medium">
                        Kullanım Koşulları
                      </Link>
                      'nı okudum, kabul ediyorum.{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>
                <Button type="submit" fullWidth loading={loading} size="lg">
                  Kayıt Ol
                </Button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Zaten hesabın var mı?{" "}
          <Link
            href={ROUTES.LOGIN}
            className="text-blue-700 font-medium hover:underline"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
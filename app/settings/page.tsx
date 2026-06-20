"use client";

import { useState } from "react";
import { Trash2, KeyRound } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";
import Modal from "@/components/ui/Modal";
import { clearAuth } from "@/lib/auth";
import { ROUTES } from "@/constants";
import api from "@/lib/api";

export default function SettingsPage() {
  // Şifre değiştirme state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Hesap silme state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    setPasswordLoading(true);

    try {
      const res = await api.put("/api/user/password", {
        currentPassword,
        newPassword,
      });
      setPasswordSuccess(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setPasswordError(err.response?.data?.message || "Bir hata oluştu.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setPasswordError("");
    setPasswordSuccess("");
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError("");
    setDeleteLoading(true);

    try {
      await api.delete("/api/user/account", { data: { password: deletePassword } });
      clearAuth();
      window.location.href = ROUTES.LOGIN;
    } catch (err: any) {
      setDeleteError(err.response?.data?.message || "Bir hata oluştu.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletePassword("");
    setDeleteError("");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Ayarlar</h1>
        <p className="text-gray-500 text-sm mt-1">
          Hesap ayarlarını buradan yönetebilirsin.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Şifre Değiştir */}
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Şifre Değiştir</h3>
              <p className="text-sm text-gray-500">
                Hesap güvenliğin için şifreni düzenli olarak güncellemenizi öneririz.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowPasswordModal(true)}
            >
              <KeyRound className="w-4 h-4 mr-1" />
              Şifre Değiştir
            </Button>
          </div>
        </Card>

        {/* Hesabı Sil */}
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Hesabı Sil</h3>
              <p className="text-sm text-gray-500">
                Hesabınız ve tüm verileriniz kalıcı olarak silinir. Bu işlem geri alınamaz.
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Hesabı Sil
            </Button>
          </div>
        </Card>
      </div>

      {/* Şifre Değiştirme Modalı */}
      <Modal
        open={showPasswordModal}
        onClose={handleClosePasswordModal}
        title="Şifre Değiştir"
      >
        <div className="flex flex-col gap-4">
          {passwordError && <Alert type="error" message={passwordError} />}
          {passwordSuccess && <Alert type="success" message={passwordSuccess} />}

          {!passwordSuccess && (
            <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
              <Input
                label="Mevcut şifre"
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <Input
                label="Yeni şifre"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  fullWidth
                  onClick={handleClosePasswordModal}
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={passwordLoading}
                >
                  Güncelle
                </Button>
              </div>
            </form>
          )}

          {passwordSuccess && (
            <Button variant="primary" fullWidth onClick={handleClosePasswordModal}>
              Tamam
            </Button>
          )}
        </div>
      </Modal>

      {/* Hesap Silme Modalı */}
      <Modal
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        title="Hesabı Kalıcı Olarak Sil"
      >
        <div className="flex flex-col gap-4">
          <Alert
            type="warning"
            message="Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir."
          />

          {deleteError && <Alert type="error" message={deleteError} />}

          <form onSubmit={handleDeleteAccount} className="flex flex-col gap-4">
            <Input
              label="Onaylamak için şifrenizi girin"
              type="password"
              placeholder="••••••••"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              required
            />
            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                fullWidth
                onClick={handleCloseDeleteModal}
              >
                İptal
              </Button>
              <Button
                type="submit"
                variant="danger"
                fullWidth
                loading={deleteLoading}
              >
                Hesabı Sil
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

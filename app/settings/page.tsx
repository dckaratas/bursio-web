"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";
import Modal from "@/components/ui/Modal";
import { clearAuth } from "@/lib/auth";
import { ROUTES } from "@/constants";
import api from "@/lib/api";

export default function SettingsPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.delete("/api/user/account", { data: { password } });
      clearAuth();
      window.location.href = ROUTES.LOGIN;
    } catch (err: any) {
      setError(err.response?.data?.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowDeleteModal(false);
    setPassword("");
    setError("");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Ayarlar</h1>
        <p className="text-gray-500 text-sm mt-1">
          Hesap ayarlarını buradan yönetebilirsin.
        </p>
      </div>

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

      <Modal
        open={showDeleteModal}
        onClose={handleClose}
        title="Hesabı Kalıcı Olarak Sil"
      >
        <div className="flex flex-col gap-4">
          <Alert
            type="warning"
            message="Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir."
          />

          {error && <Alert type="error" message={error} />}

          <form onSubmit={handleDeleteAccount} className="flex flex-col gap-4">
            <Input
              label="Onaylamak için şifrenizi girin"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                fullWidth
                onClick={handleClose}
              >
                İptal
              </Button>
              <Button
                type="submit"
                variant="danger"
                fullWidth
                loading={loading}
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
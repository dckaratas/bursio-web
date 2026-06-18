"use client";

import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Alert from "./Alert";
import Select from "./Select";
import api from "@/lib/api";
import { API_ENDPOINTS } from "@/constants";

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  reportedUserId: number;
  reportedUserName: string;
}

export default function ReportModal({
  open,
  onClose,
  reportedUserId,
  reportedUserName,
}: ReportModalProps) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post(API_ENDPOINTS.REPORTS, {
        reportedUserId,
        reason,
        description,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setReason("");
    setDescription("");
    setError("");
    setSuccess(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`${reportedUserName} kullanıcısını şikayet et`}
    >
      {success ? (
        <div className="text-center py-4">
          <Alert
            type="success"
            message="Şikayetiniz alındı. En kısa sürede incelenecektir."
          />
          <Button className="mt-4" fullWidth onClick={handleClose}>
            Kapat
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <Alert type="error" message={error} />}

          <Select
            label="Şikayet Nedeni"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Neden seç"
            options={[
              { value: "FAKE_PROFILE", label: "Sahte Profil" },
              { value: "HARASSMENT", label: "Taciz" },
              { value: "SPAM", label: "Spam" },
              { value: "OTHER", label: "Diğer" },
            ]}
            required
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Açıklama
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder="Detay vermek ister misin?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

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
              disabled={!reason}
            >
              Şikayet Et
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
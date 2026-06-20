"use client";

import { AlertTriangle } from "lucide-react";

interface Props {
  message: string;
}

export default function MaintenanceBanner({ message }: Props) {
  return (
    <div className="w-full bg-amber-50 border-b border-amber-200 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">{message}</p>
      </div>
    </div>
  );
}

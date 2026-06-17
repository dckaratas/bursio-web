import { ReactNode } from "react";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  className?: string;
}

export default function Alert({ type = "info", message, className = "" }: AlertProps) {
  const config = {
    success: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-700",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    error: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-700",
      icon: <XCircle className="w-4 h-4" />,
    },
    warning: {
      bg: "bg-yellow-50 border-yellow-200",
      text: "text-yellow-700",
      icon: <AlertCircle className="w-4 h-4" />,
    },
    info: {
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-700",
      icon: <Info className="w-4 h-4" />,
    },
  };

  const { bg, text, icon } = config[type];

  return (
    <div className={`flex items-center gap-2 px-4 py-3 border rounded-lg ${bg} ${text} ${className}`}>
      {icon}
      <p className="text-sm">{message}</p>
    </div>
  );
}
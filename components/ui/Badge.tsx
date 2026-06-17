interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "danger" | "info" | "gray";
}

export default function Badge({ label, variant = "gray" }: BadgeProps) {
  const variants = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
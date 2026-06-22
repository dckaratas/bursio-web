import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  padding = "md",
  onClick,
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm ${paddings[padding]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import api from "@/lib/api";
import { University } from "@/types";

interface UniversitySelectProps {
  value: string;
  onChange: (universityId: string, universityName: string) => void;
  error?: string;
  required?: boolean;
}

export default function UniversitySelect({
  value,
  onChange,
  error,
  required,
}: UniversitySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedName, setSelectedName] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Dışarı tıklayınca kapat
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Arama
  useEffect(() => {
    if (!open) return;

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/universities/search", {
          params: { query, size: 10 },
        });
        setUniversities(res.data.content);
      } catch {
        setUniversities([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query, open]);

  const handleSelect = (uni: University) => {
    setSelectedName(uni.name);
    onChange(uni.id.toString(), uni.name);
    setOpen(false);
    setQuery("");
  };

  const handleClear = () => {
    setSelectedName("");
    onChange("", "");
    setQuery("");
  };

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      <label className="text-sm font-medium text-gray-700">
        Üniversite
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className={`w-full px-3 py-2 border rounded-lg text-sm flex items-center justify-between cursor-pointer bg-white transition-colors
          ${error ? "border-red-400" : "border-gray-300"}
          ${open ? "ring-2 ring-blue-500 border-transparent" : "hover:border-gray-400"}`}
      >
        <span className={selectedName ? "text-gray-900" : "text-gray-400"}>
          {selectedName || "Üniversite seç..."}
        </span>
        <div className="flex items-center gap-1">
          {selectedName && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          style={{ width: ref.current?.offsetWidth }}>
          {/* Arama */}
          <div className="p-2 border-b border-gray-100">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-md">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Üniversite ara..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
                autoFocus
              />
            </div>
          </div>

          {/* Liste */}
          <div className="max-h-56 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700" />
              </div>
            ) : universities.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">
                Sonuç bulunamadı
              </p>
            ) : (
              universities.map((uni) => (
                <div
                  key={uni.id}
                  onClick={() => handleSelect(uni)}
                  className={`px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors
                    ${value === uni.id.toString() ? "bg-blue-50 text-blue-700" : "text-gray-700"}`}
                >
                  <p className="text-sm font-medium">{uni.name}</p>
                  <p className="text-xs text-gray-400">{uni.city}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
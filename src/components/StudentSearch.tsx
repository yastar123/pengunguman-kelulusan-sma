import { useState, useRef, useEffect } from "react";
import { students, Student } from "../data/students";
import { Search, GraduationCap, X, Users, Sparkles } from "lucide-react";

interface Props {
  onStudentSelect: (student: Student) => void;
}

export default function StudentSearch({ onStudentSelect }: Props) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const results = students.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(results);
      setIsOpen(results.length > 0);
      setHighlightIndex(-1);
    } else {
      setFiltered([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (student: Student) => {
    setSelectedStudent(student);
    setQuery(student.name);
    setIsOpen(false);
    onStudentSelect(student);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(filtered[highlightIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const clearSelection = () => {
    setSelectedStudent(null);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-xl mx-auto" ref={dropdownRef}>
      {/* Search container with gradient border */}
      <div className="relative">
        {/* Animated gradient border */}
        <div className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-500 ${
          isFocused ? "opacity-100" : "opacity-30"
        }`}>
          <div className="absolute inset-0 rounded-2xl animate-border-flow bg-[linear-gradient(90deg,rgba(180,83,9,0.4),rgba(20,184,166,0.3),rgba(180,83,9,0.2),rgba(20,184,166,0.4),rgba(180,83,9,0.4))]" />
        </div>

        <div className="relative flex items-center bg-white/90 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-lg shadow-amber-900/5">
          {/* Search icon */}
          <div className={`pl-5 transition-colors duration-300 ${
            isFocused ? "text-amber-700" : "text-amber-900/25"
          }`}>
            <Search size={18} strokeWidth={isFocused ? 2.5 : 2} />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (selectedStudent) setSelectedStudent(null);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsFocused(true);
              if (filtered.length > 0 && query.length >= 2) setIsOpen(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder="Ketik nama lengkap siswa..."
            className="w-full pl-3 pr-12 py-4.5 bg-transparent text-amber-950 placeholder-amber-900/25 focus:outline-none text-sm font-body tracking-wide"
          />

          {query && (
            <button
              onClick={clearSelection}
              className="absolute right-4 text-amber-900/20 hover:text-amber-900/50 transition-all duration-200 hover:rotate-90"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="relative z-50 mt-3 animate-fade-in-up" style={{ animationDuration: "0.3s" }}>
          <div className="relative bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl shadow-amber-900/8 overflow-hidden max-h-72 overflow-y-auto scrollbar-thin border border-amber-100/50">
            {/* Results count */}
            <div className="px-5 py-3 border-b border-amber-100/40 flex items-center gap-2 bg-amber-50/50">
              <Users size={12} className="text-amber-700/30" />
              <span className="text-[10px] text-amber-800/40 font-body tracking-wider uppercase">
                {filtered.length} siswa ditemukan
              </span>
            </div>

            <div className="p-2">
              {filtered.map((student, index) => (
                <button
                  key={student.id}
                  onClick={() => handleSelect(student)}
                  onMouseEnter={() => setHighlightIndex(index)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200 text-left group ${
                    index === highlightIndex
                      ? "bg-amber-50 text-amber-900"
                      : "text-amber-950/70 hover:bg-amber-50/50 hover:text-amber-900"
                  }`}
                >
                  <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    index === highlightIndex
                      ? "bg-amber-100 shadow-sm shadow-amber-200/50"
                      : "bg-amber-50 group-hover:bg-amber-100/60"
                  }`}>
                    <GraduationCap
                      size={15}
                      className={`transition-colors duration-300 ${
                        index === highlightIndex ? "text-amber-700" : "text-amber-900/25 group-hover:text-amber-700/50"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate font-body">{student.name}</p>
                    <p className={`text-[11px] mt-0.5 font-body ${
                      index === highlightIndex ? "text-amber-700/50" : "text-amber-900/30"
                    }`}>{student.class}</p>
                  </div>
                  {index === highlightIndex && (
                    <Sparkles size={12} className="text-amber-500/40 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Selected student preview */}
      {selectedStudent && !isOpen && (
        <div className="mt-4 animate-slide-in-right">
          <div className="gradient-border p-4 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-100 to-teal-50 flex items-center justify-center border border-amber-200/50">
              <GraduationCap size={18} className="text-amber-700" />
            </div>
            <div>
              <p className="text-amber-950 font-medium text-sm font-body">{selectedStudent.name}</p>
              <p className="text-amber-800/40 text-xs font-body mt-0.5">{selectedStudent.class}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

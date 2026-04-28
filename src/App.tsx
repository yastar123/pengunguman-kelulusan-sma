import { useState, useCallback } from "react";
import { GraduationCap, MapPin, Phone, Mail, ChevronDown, Star, Award } from "lucide-react";
import ParticleBackground from "./components/ParticleBackground";
import CountdownTimer from "./components/CountdownTimer";
import StudentSearch from "./components/StudentSearch";
import GraduationResult from "./components/GraduationResult";
import { Student } from "./data/students";

const LOGO_URL = "https://sman1padanggelugur.sch.id/assets/img/sman1page.png";

export default function App() {
  const [isReleased, setIsReleased] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleRelease = useCallback(() => {
    setIsReleased(true);
  }, []);

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setTimeout(() => setShowResult(true), 400);
  };

  const handleReset = () => {
    setShowResult(false);
    setTimeout(() => setSelectedStudent(null), 400);
  };

  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-amber-950 overflow-hidden">
      <ParticleBackground />

      {/* Warm ambient gradient blobs */}
      <div className="fixed top-[-15%] left-[-5%] w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-[120px] pointer-events-none animate-blob-move" />
      <div className="fixed bottom-[-15%] right-[-5%] w-[500px] h-[500px] bg-teal-200/15 rounded-full blur-[120px] pointer-events-none animate-blob-move" style={{ animationDelay: "-6s" }} />
      <div className="fixed top-[30%] right-[10%] w-[400px] h-[400px] bg-rose-100/15 rounded-full blur-[100px] pointer-events-none animate-blob-move" style={{ animationDelay: "-3s" }} />

      {/* Subtle dot pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 pattern-dots opacity-60" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="w-full py-5 px-6 md:px-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3.5 group">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-amber-200/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={LOGO_URL}
                  alt="Logo SMAN 1 Padang Gelugur"
                  className="relative w-9 h-9 md:w-11 md:h-11 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-[9px] text-amber-700/50 tracking-[0.25em] uppercase font-body font-medium leading-none mb-1">
                  SMA Negeri 1
                </p>
                <p className="text-sm font-display font-semibold text-amber-900/80 tracking-wide">
                  Padang Gelugur
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1.5 text-amber-800/30 text-[11px] font-body">
                <MapPin size={11} />
                <span>Kab. Pasaman, Sumatera Barat</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100/60 border border-amber-200/40">
                <Star size={10} className="text-amber-600/50" />
                <span className="text-[10px] text-amber-800/50 font-body font-medium tracking-wider uppercase">
                  Akreditasi A
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-24 pt-8">
          <div className="w-full max-w-4xl mx-auto text-center">
            {/* Logo with decorative rings */}
            <div className="animate-fade-in-up mb-12">
              <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-10">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-amber-300/20 animate-[spin_20s_linear_infinite]">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-500/50" />
                </div>

                {/* Middle ring */}
                <div className="absolute inset-3 rounded-full border border-teal-300/15 animate-[spin_15s_linear_infinite_reverse]">
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal-500/40" />
                </div>

                {/* Inner glow circle */}
                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-amber-100/80 via-amber-50/40 to-teal-50/60 animate-pulse-glow" />

                {/* Logo */}
                <div className="absolute inset-8 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center animate-float shadow-lg shadow-amber-200/30">
                  <img
                    src={LOGO_URL}
                    alt="Logo SMAN 1 Padang Gelugur"
                    className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-md"
                  />
                </div>
              </div>

              {/* Title section */}
              <div className="space-y-5">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="h-px w-6 bg-gradient-to-r from-transparent to-amber-600/20 animate-reveal-line" />
                  <p className="text-[10px] md:text-xs text-amber-700/50 tracking-[0.35em] uppercase font-body font-medium">
                    Pengumuman Hasil
                  </p>
                  <div className="h-px w-6 bg-gradient-to-l from-transparent to-amber-600/20 animate-reveal-line" />
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[0.9]">
                  <span className="text-gradient-gold-shimmer">
                    Kelulusan
                  </span>
                </h1>

                <div className="flex items-center justify-center gap-4 mt-5">
                  <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-amber-600/30" />
                    <p className="text-base md:text-xl text-amber-900/60 font-display font-light tracking-wide">
                      SMA Negeri 1 Padang Gelugur
                    </p>
                  </div>
                  <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-amber-400/20 to-transparent" />
                </div>

                <p className="text-amber-800/25 text-xs md:text-sm font-body tracking-wider mt-3">
                  Tahun Pelajaran 2025/2026
                </p>
              </div>
            </div>

            {/* Content area */}
            <div className="mt-4">
              {!isReleased ? (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  <CountdownTimer onRelease={handleRelease} />
                  <div className="mt-12 space-y-4">
                    <div className="flex items-center justify-center gap-2 text-amber-800/25 text-xs font-body">
                      <GraduationCap size={14} className="text-amber-600/25" />
                      <span>Pengumuman akan dibuka secara otomatis</span>
                    </div>
                    <div className="flex items-center justify-center gap-6 text-[10px] text-amber-800/20 font-body">
                      <div className="flex items-center gap-1.5">
                        <Phone size={9} />
                        <span>(0753) 338746</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail size={9} />
                        <span>admin@sman1padanggelugur.sch.id</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : !showResult ? (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  {/* Release badge */}
                  <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-200/50 mb-8 hover-lift shadow-sm shadow-emerald-100/50">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <span className="text-emerald-700/80 text-xs font-body font-medium tracking-wide">
                      Pengumuman Kelulusan Telah Dibuka
                    </span>
                  </div>

                  <StudentSearch onStudentSelect={handleStudentSelect} />

                  <p className="text-amber-800/20 text-[11px] font-body mt-8 tracking-wide">
                    Masukkan nama lengkap untuk mengecek status kelulusan
                  </p>
                </div>
              ) : selectedStudent ? (
                <div className="animate-scale-in">
                  <GraduationResult student={selectedStudent} onReset={handleReset} />
                </div>
              ) : null}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-10 px-6 border-t border-amber-200/20">
          <div className="max-w-4xl mx-auto">
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-amber-300/15" />
              <img
                src={LOGO_URL}
                alt="Logo"
                className="w-5 h-5 object-contain opacity-20"
              />
              <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-amber-300/15" />
            </div>

            <div className="text-center space-y-3">
              <p className="text-amber-900/20 text-[10px] font-body tracking-[0.15em] uppercase font-medium">
                SMAN 1 Padang Gelugur
              </p>
              <p className="text-amber-800/15 text-[9px] font-body leading-relaxed max-w-md mx-auto">
                Excellence in Education &middot; Jl. Padang - Medan KM. 210 Muara Bangun,
                Kec. Padang Gelugur, Kab. Pasaman, Sumatera Barat 26355
              </p>
              <p className="text-amber-800/10 text-[9px] font-body">
                &copy; 2026 SMAN 1 Padang Gelugur. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Scroll indicator */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-10 text-amber-400/15 animate-bounce">
        <ChevronDown size={16} />
      </div>
    </div>
  );
}

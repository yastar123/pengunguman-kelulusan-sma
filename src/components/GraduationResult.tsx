import { Student } from "../data/students";
import { CheckCircle2, XCircle, PartyPopper, BookOpen, Award, ArrowLeft, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  student: Student;
  onReset: () => void;
}

export default function GraduationResult({ student, onReset }: Props) {
  const [phase, setPhase] = useState(0);
  const isGraduated = student.isGraduated;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 600);
    const t3 = setTimeout(() => setPhase(3), 1000);
    const t4 = setTimeout(() => setPhase(4), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto relative">
      {isGraduated && phase >= 3 && <Confetti />}

      <div className={`relative overflow-hidden rounded-3xl transition-all duration-1000 ${
        phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}>
        {/* Animated gradient border */}
        <div className="absolute -inset-[1px] rounded-3xl overflow-hidden">
          <div className={`absolute inset-0 animate-border-flow ${
            isGraduated
              ? "bg-[linear-gradient(90deg,rgba(16,185,129,0.5),rgba(20,184,166,0.4),rgba(52,211,153,0.3),rgba(16,185,129,0.5))]"
              : "bg-[linear-gradient(90deg,rgba(239,68,68,0.4),rgba(244,63,94,0.3),rgba(239,68,68,0.4))]"
          }`} style={{ backgroundSize: "300% 300%" }} />
        </div>

        <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/5">
          {/* Top accent bar */}
          <div className={`h-[3px] w-full ${
            isGraduated
              ? "bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
              : "bg-gradient-to-r from-transparent via-red-400 to-transparent"
          }`} />

          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[80px] transition-opacity duration-1000 ${
              phase >= 2 ? "opacity-100" : "opacity-0"
            } ${isGraduated ? "bg-emerald-100/60" : "bg-red-100/60"}`} />
            <div className={`absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-[80px] transition-opacity duration-1000 delay-300 ${
              phase >= 2 ? "opacity-100" : "opacity-0"
            } ${isGraduated ? "bg-teal-100/50" : "bg-rose-100/50"}`} />
          </div>

          <div className="relative p-8 md:p-12 text-center">
            {/* Phase 1: Icon reveal */}
            <div className={`transition-all duration-700 ${
              phase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}>
              <div className={`mx-auto w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mb-8 relative ${
                isGraduated ? "bg-emerald-50 border-2 border-emerald-200/50" : "bg-red-50 border-2 border-red-200/50"
              }`}>
                {isGraduated && phase >= 2 && (
                  <>
                    <div className="absolute inset-0 rounded-full border border-emerald-300/30 animate-[ripple_2s_ease-out_infinite]" />
                    <div className="absolute inset-0 rounded-full border border-emerald-300/20 animate-[ripple_2s_ease-out_infinite_0.5s]" />
                    <div className="absolute inset-0 rounded-full border border-emerald-200/15 animate-[ripple_2s_ease-out_infinite_1s]" />
                  </>
                )}

                {isGraduated ? (
                  <CheckCircle2 size={44} className="text-emerald-600" strokeWidth={1.5} />
                ) : (
                  <XCircle size={44} className="text-red-500" strokeWidth={1.5} />
                )}
              </div>
            </div>

            {/* Phase 2: Status text */}
            <div className={`transition-all duration-700 ${
              phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}>
              {isGraduated ? (
                <div className="mb-3">
                  <div className="flex items-center justify-center gap-3">
                    <PartyPopper size={22} className="text-amber-600" />
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-gold">
                      SELAMAT!
                    </h2>
                    <PartyPopper size={22} className="text-amber-600 scale-x-[-1]" />
                  </div>
                  <p className="text-emerald-700/60 text-sm md:text-base font-body mt-3 leading-relaxed">
                    Anda dinyatakan <span className="font-semibold text-emerald-700">LULUS</span> dari
                  </p>
                  <p className="text-emerald-700/60 text-sm md:text-base font-body">
                    SMAN 1 Padang Gelugur
                  </p>
                </div>
              ) : (
                <div className="mb-3">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-red-600/90">
                    MOHON MAAF
                  </h2>
                  <p className="text-red-600/50 text-sm md:text-base font-body mt-3 leading-relaxed">
                    Anda dinyatakan <span className="font-semibold text-red-600">BELUM LULUS</span> dari
                  </p>
                  <p className="text-red-600/50 text-sm md:text-base font-body">
                    SMAN 1 Padang Gelugur
                  </p>
                </div>
              )}
            </div>

            {/* Phase 3: Student info card */}
            <div className={`transition-all duration-700 ${
              phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}>
              <div className={`mt-8 relative overflow-hidden rounded-2xl ${
                isGraduated
                  ? "bg-emerald-50/80 border border-emerald-200/40"
                  : "bg-red-50/80 border border-red-200/40"
              }`}>
                {/* Decorative corner accents */}
                <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg ${
                  isGraduated ? "border-emerald-300/40" : "border-red-300/40"
                }`} />
                <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg ${
                  isGraduated ? "border-emerald-300/40" : "border-red-300/40"
                }`} />
                <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg ${
                  isGraduated ? "border-emerald-300/40" : "border-red-300/40"
                }`} />
                <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-lg ${
                  isGraduated ? "border-emerald-300/40" : "border-red-300/40"
                }`} />

                <div className="px-8 py-6 flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Award size={14} className={isGraduated ? "text-emerald-600/40" : "text-red-600/40"} />
                    <span className={`text-[10px] uppercase tracking-[0.2em] font-body font-medium ${
                      isGraduated ? "text-emerald-700/40" : "text-red-700/40"
                    }`}>Data Siswa</span>
                  </div>
                  <p className="text-amber-950 font-display font-bold text-xl md:text-2xl tracking-wide">
                    {student.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <BookOpen size={13} className="text-amber-800/30" />
                    <p className="text-amber-800/50 text-sm font-body">{student.class}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 4: Quote + Button */}
            <div className={`transition-all duration-700 ${
              phase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}>
              <div className="mt-8 mb-8">
                {isGraduated ? (
                  <div className="space-y-1">
                    <Sparkles size={12} className="mx-auto text-amber-500/40 mb-2" />
                    <p className="text-emerald-800/30 text-xs italic font-body leading-relaxed">
                      "Pendidikan adalah senjata paling ampuh yang bisa<br />kamu gunakan untuk mengubah dunia."
                    </p>
                    <p className="text-emerald-800/15 text-[10px] font-body">Nelson Mandela</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-red-800/30 text-xs italic font-body leading-relaxed">
                      "Kegagalan adalah kesuksesan yang tertunda.<br />Tetap semangat dan jangan menyerah."
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={onReset}
                className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body font-medium transition-all duration-300 hover-lift ${
                  isGraduated
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50 hover:bg-emerald-100 hover:border-emerald-300/50"
                    : "bg-red-50 text-red-600 border border-red-200/50 hover:bg-red-100 hover:border-red-300/50"
                }`}
              >
                <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
                Cek Siswa Lainnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  const colors = ["#fbbf24", "#10b981", "#14b8a6", "#f59e0b", "#34d399", "#fde68a", "#6ee7b7", "#d97706"];
  const shapes = ["circle", "rect", "diamond"] as const;

  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2.5,
    duration: 2.5 + Math.random() * 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 5 + Math.random() * 10,
    rotation: Math.random() * 360,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    drift: (Math.random() - 0.5) * 200,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.left}%`,
            top: "-20px",
            width: `${p.size}px`,
            height: p.shape === "rect" ? `${p.size * 0.5}px` : `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.shape === "circle" ? "50%" : p.shape === "diamond" ? "2px" : "1px",
            transform: `rotate(${p.rotation}deg) ${p.shape === "diamond" ? "rotate(45deg)" : ""}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            marginLeft: `${p.drift}px`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

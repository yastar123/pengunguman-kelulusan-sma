import { useState, useEffect } from "react";
import { RELEASE_DATE } from "../data/students";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function TimeUnit({ value, label, delay }: { value: number; label: string; delay: number }) {
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (prevValue !== value) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setPrevValue(value);
        setIsFlipping(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div className="flex flex-col items-center gap-3" style={{ animationDelay: `${delay}ms` }}>
      <div className="relative group">
        {/* Rotating border glow */}
        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden opacity-50 group-hover:opacity-80 transition-opacity duration-500">
          <div className="absolute inset-[-100%] animate-rotate-border bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(180,83,9,0.3)_360deg)]" />
        </div>

        <div className="relative w-[72px] h-[80px] sm:w-[100px] sm:h-[110px] md:w-[120px] md:h-[130px] rounded-2xl bg-white/80 backdrop-blur-xl border border-amber-100/60 flex items-center justify-center overflow-hidden shadow-lg shadow-amber-900/5">
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-transparent to-amber-100/30" />

          {/* Top/bottom subtle lines */}
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
          <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-300/15 to-transparent" />

          {/* Number with flip animation */}
          <div className="relative">
            <span
              className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold tabular-nums tracking-tight transition-all duration-300 ${
                isFlipping
                  ? "opacity-0 -translate-y-2 scale-95 blur-sm"
                  : "opacity-100 translate-y-0 scale-100 blur-0"
              }`}
              style={{
                background: "linear-gradient(180deg, #92400e 0%, #b45309 50%, #d97706 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {String(value).padStart(2, "0")}
            </span>
          </div>

          {/* Center divider line */}
          <div className="absolute left-[8%] right-[8%] top-1/2 h-px bg-amber-200/30" />
        </div>
      </div>

      <span className="text-[9px] sm:text-[10px] md:text-xs text-amber-700/40 uppercase tracking-[0.25em] font-body font-medium">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ onRelease }: { onRelease: () => void }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isReleased, setIsReleased] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const distance = RELEASE_DATE.getTime() - now;

      if (distance <= 0) {
        setIsReleased(true);
        onRelease();
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [onRelease]);

  if (isReleased) return null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-600/20" />
        <p className="text-[10px] sm:text-xs text-amber-700/40 tracking-[0.3em] uppercase font-body font-medium">
          Pengumuman Kelulusan
        </p>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-600/20" />
      </div>

      <div className="flex justify-center gap-3 sm:gap-4 md:gap-6">
        <TimeUnit value={timeLeft.days} label="Hari" delay={0} />
        <div className="flex items-center pb-6">
          <span className="text-amber-600/25 text-2xl md:text-3xl font-display font-light animate-pulse">:</span>
        </div>
        <TimeUnit value={timeLeft.hours} label="Jam" delay={100} />
        <div className="flex items-center pb-6">
          <span className="text-amber-600/25 text-2xl md:text-3xl font-display font-light animate-pulse">:</span>
        </div>
        <TimeUnit value={timeLeft.minutes} label="Menit" delay={200} />
        <div className="flex items-center pb-6">
          <span className="text-amber-600/25 text-2xl md:text-3xl font-display font-light animate-pulse">:</span>
        </div>
        <TimeUnit value={timeLeft.seconds} label="Detik" delay={300} />
      </div>
    </div>
  );
}

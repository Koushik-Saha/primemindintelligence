export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0F2C]"
      aria-label="Loading page"
      role="status"
    >
      {/* Animated logo-like spinner */}
      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <svg
          className="absolute w-16 h-16 animate-spin"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
          style={{ animationDuration: "1.4s" }}
        >
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="url(#spinner-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="60 115"
          />
          <defs>
            <linearGradient id="spinner-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#2563EB" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Inner dot */}
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
}

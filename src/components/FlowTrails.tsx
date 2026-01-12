function FlowTrails() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 720"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="glo" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="p" x1="0" y1="0" x2="1440" y2="0">
          <stop offset="0%" stopColor="rgba(140,65,255,0)" />
          <stop offset="35%" stopColor="rgba(140,65,255,0.18)" />
          <stop offset="55%" stopColor="rgba(140,65,255,0.85)" />
          <stop offset="78%" stopColor="rgba(140,65,255,0.18)" />
          <stop offset="100%" stopColor="rgba(140,65,255,0)" />
        </linearGradient>

        <linearGradient id="c" x1="0" y1="0" x2="1440" y2="0">
          <stop offset="0%" stopColor="rgba(53,240,255,0)" />
          <stop offset="35%" stopColor="rgba(53,240,255,0.14)" />
          <stop offset="56%" stopColor="rgba(53,240,255,0.70)" />
          <stop offset="80%" stopColor="rgba(53,240,255,0.14)" />
          <stop offset="100%" stopColor="rgba(53,240,255,0)" />
        </linearGradient>
      </defs>

      {/* “trilha” roxa */}
      <path
        className="trail slow"
        d="M-140 520 C 160 430, 420 640, 740 520 C 980 430, 1160 360, 1580 420"
        stroke="url(#p)"
        strokeWidth="4"
        filter="url(#glo)"
      />

      {/* “trilha” ciano */}
      <path
        className="trail fast"
        d="M-160 570 C 140 470, 420 700, 780 570 C 1040 475, 1220 420, 1600 500"
        stroke="url(#c)"
        strokeWidth="4"
        filter="url(#glo)"
      />

      {/* highlights finos (dão o “premium”) */}
      <path
        d="M-160 545 C 120 440, 430 675, 820 545 C 1080 455, 1240 410, 1600 470"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1.2"
        opacity="0.9"
      />
      <path
        d="M-160 595 C 120 490, 430 720, 820 595 C 1080 505, 1240 460, 1600 530"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="1"
        opacity="0.9"
      />
    </svg>
  );
}

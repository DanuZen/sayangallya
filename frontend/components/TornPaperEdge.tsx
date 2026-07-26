"use client";

interface TornPaperEdgeProps {
  color?: string;
  className?: string;
}

/**
 * High-End Organic Torn Paper Top Edge Divider
 */
export function TornPaperEdgeTop({ color = "#FAF5EF", className = "" }: TornPaperEdgeProps) {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-16 block drop-shadow-md opacity-95"
      >
        {/* Soft shadow layer underneath tear */}
        <path
          d="M0,0 L0,32 C60,48 120,24 180,40 C240,56 300,30 360,44 C420,58 480,20 540,38 C600,56 660,26 720,42 C780,58 840,32 900,46 C960,60 1020,28 1080,42 C1140,56 1200,24 1260,38 C1320,52 1380,30 1440,40 L1440,0 Z"
          fill="rgba(74, 30, 44, 0.12)"
          transform="translate(0, 3)"
        />
        {/* Main Deckle Torn Paper Surface */}
        <path
          d="M0,0 L0,32 C60,48 120,24 180,40 C240,56 300,30 360,44 C420,58 480,20 540,38 C600,56 660,26 720,42 C780,58 840,32 900,46 C960,60 1020,28 1080,42 C1140,56 1200,24 1260,38 C1320,52 1380,30 1440,40 L1440,0 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/**
 * High-End Organic Torn Paper Bottom Edge Divider
 */
export function TornPaperEdgeBottom({ color = "#FAF5EF", className = "" }: TornPaperEdgeProps) {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-16 block drop-shadow-md opacity-95"
      >
        {/* Soft shadow layer underneath tear */}
        <path
          d="M0,60 L0,28 C60,12 120,36 180,20 C240,4 300,30 360,16 C420,2 480,40 540,22 C600,4 660,34 720,18 C780,2 840,28 900,14 C960,0 1020,32 1080,18 C1140,4 1200,36 1260,22 C1320,8 1380,30 1440,20 L1440,60 Z"
          fill="rgba(74, 30, 44, 0.12)"
          transform="translate(0, -3)"
        />
        {/* Main Deckle Torn Paper Surface */}
        <path
          d="M0,60 L0,28 C60,12 120,36 180,20 C240,4 300,30 360,16 C420,2 480,40 540,22 C600,4 660,34 720,18 C780,2 840,28 900,14 C960,0 1020,32 1080,18 C1140,4 1200,36 1260,22 C1320,8 1380,30 1440,20 L1440,60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════════════════
   SPOTLIGHT
   ─────────────────────────────────────────────────
   Decorative blurred ellipse used as a hero light source.
   • Unique filter ID per instance (no cross-rendering bugs)
   • Customizable color, opacity, blur
   • Decorative — hidden from screen readers
═══════════════════════════════════════════════════ */
export const Spotlight = ({
  className,
  fill = 'white',
  fillOpacity = 0.21,
  blur = 151,
}) => {
  /*
    Unique ID per Spotlight instance.
    Without this, multiple Spotlights on the same page
    share the same filter definition — causing rendering bugs.
  */
  const id = useId();
  const filterId = `spotlight-filter-${id}`;

  return (
    <svg
      className={cn('spotlight', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <g filter={`url(#${filterId})`}>
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity={fillOpacity}
        />
      </g>

      <defs>
        <filter
          id={filterId}
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation={blur}
            result="effect1_foregroundBlur"
          />
        </filter>
      </defs>

      <style>{`
        .spotlight {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          height: 169%;
          width: 138%;
          opacity: 0;
          animation: spotlight 2s var(--ease-smooth) 0.75s 1 forwards;
        }

        @media (min-width: 1024px) {
          .spotlight {
            width: 84%;
          }
        }

        @keyframes spotlight {
          0% {
            opacity: 0;
            transform: translate(-72%, -62%) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -40%) scale(1);
          }
        }

        /* Reduced motion — show spotlight without animation */
        @media (prefers-reduced-motion: reduce) {
          .spotlight {
            animation: none;
            opacity: 1;
            transform: translate(-50%, -40%) scale(1);
          }
        }
      `}</style>
    </svg>
  );
};
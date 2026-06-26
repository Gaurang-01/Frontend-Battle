/**
 * ENTRY LOADER COMPONENT
 * Uses native CSS animations (no WAAPI) finishing within 500ms.
 * Semantic HTML is NOT blocked — loader overlays the already-rendered DOM.
 * TTI is unaffected because the React tree renders immediately.
 */
import { useEffect, useRef } from 'react';

export default function EntryLoader() {
  const loaderRef = useRef(null);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    // Remove from accessibility tree after animation completes (500ms cap)
    const timer = setTimeout(() => {
      if (el) {
        el.style.display = 'none';
        el.setAttribute('aria-hidden', 'true');
      }
    }, 520);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={loaderRef}
      role="progressbar"
      aria-label="Loading NeuralGrid platform"
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-canvas entrance-loader"
    >
      {/* Monospace brand stamp */}
      <div className="font-mono text-forsythia text-lg tracking-[0.3em] mb-8 font-semibold">
        NEURALGRID
      </div>

      {/* Progress bar track */}
      <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full entrance-loader-bar"
          style={{
            background: 'linear-gradient(90deg, #FFC801, #FF9932)',
          }}
        />
      </div>

      {/* Status text */}
      <div className="mt-4 font-mono text-xs text-mint/40 tracking-widest">
        INITIALIZING KERNEL...
      </div>
    </div>
  );
}

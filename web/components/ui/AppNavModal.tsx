"use client";

import { useState, useEffect, useRef, CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export type AppNavEntry = {
  _id: string;
  title: string;
  slug: { current: string };
  icon?: { asset?: { url?: string } };
};

// ─── BorderBeam ─────────────────────────────────────────────────────────────
// Animates a radial-gradient light along the container's border path.
// Parent must have position:relative and overflow:hidden.
function BorderBeam({
  lightWidth = 130,
  duration = 5,
  lightColor = "#64bff6",
  borderWidth = 1.5,
}: {
  lightWidth?: number;
  duration?: number;
  lightColor?: string;
  borderWidth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty(
        "--path",
        `path("M 0 0 H ${el.offsetWidth} V ${el.offsetHeight} H 0 V 0")`,
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={ref}
      style={
        {
          "--border-width": `${borderWidth}px`,
          border: `${borderWidth}px solid transparent`,
          // Mask technique: cut out the padding-box so only the border strip is visible
          WebkitMask:
            "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        } as CSSProperties
      }
      className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
    >
      <motion.div
        className="absolute aspect-square bg-[radial-gradient(ellipse_at_center,var(--light-color)_0%,transparent_65%)]"
        style={
          {
            "--light-color": lightColor,
            width: `${lightWidth}px`,
            offsetPath: "var(--path)",
          } as CSSProperties
        }
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// ─── AppNavModal ─────────────────────────────────────────────────────────────
export function AppNavModal({
  apps,
  currentSlug,
}: {
  apps: AppNavEntry[];
  currentSlug: string;
}) {
  const [open, setOpen] = useState(false);
  const otherApps = apps.filter((a) => a.slug.current !== currentSlug);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ── Trigger button ─────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Toon alle Faect Apps"
        className="border-faect-blue/60 text-faect-blue hover:bg-faect-blue nav-item-sweep font-ui relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border bg-white py-2.5 font-semibold shadow-sm transition-colors hover:text-white"
      >
        <BorderBeam />
        <span className="relative z-10 flex items-center gap-2">
          <GridIcon className="h-4 w-4 shrink-0" />
          De andere Faect Apps
        </span>
      </button>

      {/* ── Modal overlay + sheet ───────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-faect-navy/50 fixed inset-0 z-40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[80dvh] overflow-hidden rounded-t-3xl bg-white shadow-2xl"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="h-1 w-10 rounded-full bg-gray-200" />
              </div>

              {/* Sheet header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-3">
                <p className="font-cairo text-faect-navy text-lg font-bold">
                  De andere Faect Apps
                </p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Sluit"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-700"
                >
                  <XIcon />
                </button>
              </div>

              {/* App grid */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="grid grid-cols-2 gap-3 overflow-y-auto p-4 pb-8"
                style={{ maxHeight: "calc(80dvh - 5rem)" }}
              >
                {otherApps.map((app) => (
                  <Link
                    key={app._id}
                    href={`/faect-apps/${app.slug.current}`}
                    onClick={() => setOpen(false)}
                    className="hover:border-faect-blue/30 hover:bg-faect-blue/5 flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition-all duration-200 active:scale-95"
                  >
                    {app.icon?.asset?.url ? (
                      <Image
                        src={app.icon.asset.url}
                        alt={app.title}
                        width={40}
                        height={40}
                        className="h-10 w-10 shrink-0 rounded-full object-contain"
                      />
                    ) : (
                      <div className="bg-faect-blue/10 h-10 w-10 shrink-0 rounded-full" />
                    )}
                    <span className="text-faect-navy text-sm leading-tight font-semibold">
                      {app.title}
                    </span>
                  </Link>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

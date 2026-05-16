"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Mail, Phone, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { cn, formatDutchPhone } from "./sectionUtils";

export type TeamMemberData = {
  _id: string;
  name: string;
  role?: string | null;
  bio?: string | null;
  photo?: { asset?: { _ref?: string; url?: string } } | null;
  photoUrl?: string | null;
  email?: string | null;
  phone?: string | null;
  linkedIn?: string | null;
};

function getPhotoSrc(
  member: TeamMemberData,
  width = 480,
  height = 640,
): string | null {
  if (member.photoUrl) return member.photoUrl;
  if (member.photo?.asset?.url) return member.photo.asset.url;
  if (member.photo?.asset?._ref)
    return urlFor(member.photo).width(width).height(height).url();
  return null;
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MemberMonogram({ name, large }: { name: string; large?: boolean }) {
  const words = name.trim().split(/\s+/);
  const initials =
    words.length >= 2
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();
  return (
    <div
      className={cn(
        "bg-faect-navy flex items-center justify-center rounded-full",
        large ? "h-24 w-24" : "h-16 w-16",
      )}
    >
      <span
        className={cn(
          "font-cairo font-bold text-white",
          large ? "text-3xl" : "text-xl",
        )}
      >
        {initials}
      </span>
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────

function TeamModal({
  members,
  activeIndex,
  onClose,
  onSelect,
}: {
  members: TeamMemberData[];
  activeIndex: number;
  onClose: () => void;
  onSelect: (index: number) => void;
}) {
  const member = members[activeIndex];
  const photoSrc = getPhotoSrc(member, 560, 720);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown")
        onSelect(Math.min(activeIndex + 1, members.length - 1));
      if (e.key === "ArrowUp") onSelect(Math.max(activeIndex - 1, 0));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onSelect, activeIndex, members.length]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative flex h-full max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar — team navigation */}
        <aside className="bg-faect-blue/5 hidden w-52 shrink-0 flex-col overflow-y-auto border-r border-gray-100 md:flex">
          <div className="border-b border-gray-100 px-4 pt-3 text-center">
            <p className="font-ui text-faect-navy my-2 text-[0.8rem] font-semibold tracking-[0.05em] uppercase">
              Ons Team
            </p>
          </div>
          <nav className="flex flex-col py-2">
            {members.map((m, idx) => {
              const isActive = idx === activeIndex;
              const thumbSrc = getPhotoSrc(m, 64, 64);
              if (isActive) return null;
              return (
                <button
                  key={m._id}
                  onClick={() => onSelect(idx)}
                  className="text-faect-navy border-faect-blue/15 hover:border-faect-blue hover:bg-faect-blue group flex w-full items-center gap-2 border-b-2 px-3 py-2.5 text-left transition-colors duration-150"
                >
                  {/* Small circle avatar */}
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-gray-100">
                    {thumbSrc ? (
                      <Image
                        src={thumbSrc}
                        alt={m.name}
                        fill
                        style={{
                          objectFit: "cover",
                          objectPosition: "top center",
                        }}
                      />
                    ) : (
                      <MemberMonogram name={m.name} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <span className="font-cairo block truncate text-[.95rem] leading-tight font-semibold group-hover:font-bold group-hover:text-white">
                      {m.name}
                    </span>
                    {m.role && (
                      <span className="hover: mt-0.25 block truncate text-[0.85rem] text-gray-700 group-hover:font-medium group-hover:text-gray-200">
                        {m.role}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Sluiten"
            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow transition-colors hover:bg-white hover:text-gray-900"
          >
            <X className="size-4" />
          </button>

          {/* Scrollable area */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-6 px-8 pt-10 pb-8">
              {/* Circular photo + name + role — centered header */}
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="border-faect-blue/15 relative h-40 w-40 overflow-hidden rounded-full border-4 shadow-lg">
                  {photoSrc ? (
                    <Image
                      src={photoSrc}
                      alt={member.name}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "top center",
                      }}
                    />
                  ) : (
                    <MemberMonogram name={member.name} large />
                  )}
                </div>
                <div>
                  <h2 className="font-cairo text-faect-navy text-3xl font-bold">
                    {member.name}
                  </h2>
                  {member.role && (
                    <p className="font-ui text-faect-blue mt-1 text-[.9rem] font-semibold tracking-widest uppercase">
                      {member.role}
                    </p>
                  )}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* Bio */}
              {member.bio && (
                <p className="text-faect-gray leading-9 font-medium">
                  {member.bio}
                </p>
              )}

              {(member.email || member.phone || member.linkedIn) && (
                <div className="flex flex-wrap items-center gap-6 border-t border-gray-100 pt-4">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-faect-blue hover:text-faect-navy inline-flex items-center gap-2 font-medium transition-all hover:gap-3"
                    >
                      <Mail className="size-4 shrink-0" />
                      {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/[\s\-\.\(\)]/g, "")}`}
                      className="text-faect-blue hover:text-faect-navy inline-flex items-center gap-2 font-medium transition-all hover:gap-3"
                    >
                      <Phone className="size-4 shrink-0" />
                      {formatDutchPhone(member.phone)}
                    </a>
                  )}
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-faect-blue hover:text-faect-navy inline-flex items-center gap-2 font-medium transition-all hover:gap-3"
                    >
                      <LinkedInIcon className="size-4 shrink-0" />
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile nav strip — avatar pill per team member, active excluded */}
          <div className="shrink-0 overflow-x-auto border-t border-gray-100 px-4 py-3 md:hidden">
            <div className="flex gap-2">
              {members.map((m, idx) => {
                if (idx === activeIndex) return null;
                const thumbSrc = getPhotoSrc(m, 64, 64);
                return (
                  <button
                    key={m._id}
                    onClick={() => onSelect(idx)}
                    className="hover:border-faect-blue hover:bg-faect-blue font-cairo text-faect-navy flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pr-3 pl-1 font-semibold transition-all duration-150 hover:text-white active:scale-95"
                  >
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-gray-100">
                      {thumbSrc ? (
                        <Image
                          src={thumbSrc}
                          alt={m.name}
                          fill
                          style={{
                            objectFit: "cover",
                            objectPosition: "top center",
                          }}
                        />
                      ) : (
                        <MemberMonogram name={m.name} />
                      )}
                    </div>
                    <span>{m.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Cards grid ─────────────────────────────────────────────────────────────

export function TeamCardsWithModal({
  members,
  showBio = true,
  columns = 3,
}: {
  members: TeamMemberData[];
  showBio?: boolean;
  columns?: 2 | 3 | 4;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const close = useCallback(() => setActiveIndex(null), []);

  const gridCols: Record<number, string> = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <>
      <div className={cn("grid grid-cols-1 gap-6", gridCols[columns])}>
        {members.map((member, index) => {
          const photoSrc = getPhotoSrc(member, 400, 520);
          return (
            <button
              key={member._id}
              onClick={() => setActiveIndex(index)}
              className="group hover:border-faect-blue/20 flex w-full flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Circular photo */}
              <div className="group-hover:border-faect-blue/30 relative mb-5 h-45 w-45 overflow-hidden rounded-full border-4 border-gray-100 transition-all duration-300">
                {photoSrc ? (
                  <Image
                    src={photoSrc}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="bg-faect-blue/5 flex h-full items-center justify-center">
                    <MemberMonogram name={member.name} large />
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="font-cairo text-faect-navy text-xl font-bold">
                {member.name}
              </h3>
              {member.role && (
                <p className="text-faect-blue text-[1.05rem] font-medium">
                  {member.role}
                </p>
              )}
              {showBio && member.bio && (
                <p className="mt-1 line-clamp-3 text-lg leading-relaxed text-gray-500">
                  {member.bio}
                </p>
              )}
              <span className="text-faect-blue hover:text-faect-navy mt-3 inline-flex items-center gap-1.5 font-medium transition-all duration-200 group-hover:gap-3">
                Lees meer
                <ChevronRight className="size-4 shrink-0" />
              </span>
            </button>
          );
        })}
      </div>

      {activeIndex !== null && (
        <TeamModal
          members={members}
          activeIndex={activeIndex}
          onClose={close}
          onSelect={setActiveIndex}
        />
      )}
    </>
  );
}

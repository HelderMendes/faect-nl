'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {urlFor} from '@/sanity/lib/image'
import {getSectionStyles, type SectionSettings, cn} from './sectionUtils'

interface BlockHeroProps {
  heading: string
  subheading?: string
  backgroundImage?: any
  intro01?: string
  intro02?: string
  infoBlocks?: string[] // For backwards compatibility
  settings?: SectionSettings
}

export function BlockHero({
  heading,
  subheading,
  backgroundImage,
  intro01,
  intro02,
  infoBlocks, // Used for Intro 01 and Intro 02
  settings,
}: BlockHeroProps) {
  const activeIntroBlocks = [intro01, intro02, ...(infoBlocks || [])].filter(Boolean) as string[]
  // Hero always uses navy background as a fallback
  const baseClasses =
    settings?.backgroundColor === 'navy' || !settings?.backgroundColor
      ? 'flex items-center'
      : cn(getSectionStyles(settings), 'flex items-center')

  return (
    <section className={cn('relative w-full', baseClasses)}>
      {/* Background Image - Photoshop worked for text visibility, no extra filters or overflow needed */}
      {backgroundImage?.asset && (
        <div className="absolute inset-0 z-0 animate-fade-in overflow-hidden">
          <Image
            src={
              backgroundImage.asset.url || urlFor(backgroundImage).width(1920).height(1080).url()
            }
            alt={heading}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="min-h-[800px] flex flex-col justify-center">
          <div className="flex flex-col gap-0 items-start">
            {/* Title Container */}
            <div className="animate-fade-in mr-[45%]">
              <h1 className="font-heading text-[3.8rem] font-bold leading-[1.1] text-faect-blue pb-6">
                {heading}
              </h1>
            </div>

            {/* Subtitle/Text Container */}
            {subheading && (
              <div
                className="animate-fade-in"
                style={{
                  margin: '0% 45% 0% 0%',
                  padding: '0px 0px 65px 0px',
                }}
              >
                <p className="font-ui text-[2rem] font-normal leading-[1.2] text-white">
                  {subheading}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Intro Blocks 01 & 02 (Positioned 40px from absolute bottom of section) */}
        {activeIntroBlocks.length > 0 && (
          <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col animate-slide-up pointer-events-none">
            {activeIntroBlocks.map((block, idx) => (
              <div
                key={idx}
                className="bg-[#1E3E74CC] border-l-[6px] border-white shadow-2xl pointer-events-auto"
                style={{
                  margin: '0% 0% 1% 52%',
                  padding: '5px 5px 5px 10px',
                }}
              >
                <p className="text-white font-heading text-[1.2rem] font-normal leading-7">
                  {block}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

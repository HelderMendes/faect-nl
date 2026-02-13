'use client'

import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'
import {navigation} from '@/config/navigation'
import {Menu} from 'lucide-react'
import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

import {useState, useEffect} from 'react'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-500',
        isHome && !scrolled
          ? 'bg-transparent py-4'
          : 'bg-[#050A14]/90 backdrop-blur-md border-b border-white/5 py-1',
      )}
    >
      <div className="container mx-auto flex h-24 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative h-14 w-36 md:w-44 transition-transform duration-300 hover:scale-105">
            <Image
              src="/Logo_Faect_fc.png"
              alt="FAECT"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-5 py-2 rounded-[8px] text-base font-ui font-medium transition-all duration-300',
                  isActive
                    ? 'bg-white text-faect-navy'
                    : 'text-white hover:bg-faect-blue hover:text-white',
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Right side - Contact Button */}
        <div className="shrink-0">
          <Link
            href="/contact"
            className="px-8 pt-[3px] pb-[3px] border border-white rounded-[8px] text-white font-ui text-[1.2rem] font-light hover:bg-white hover:text-faect-blue transition-all"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button - Only visible on small screens */}
        <button className="lg:hidden p-2 text-white">
          <Menu className="h-8 w-8" />
        </button>
      </div>
    </header>
  )
}

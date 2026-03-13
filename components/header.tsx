"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import Image from "next/image"
import logo from "./image.png"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Initiatives", href: "/initiatives" },
  { name: "Events", href: "/events" },
]

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
      <span
        className={cn(
          "block h-[1.5px] w-5 rounded-full bg-foreground transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          open && "translate-y-[6.5px] rotate-45"
        )}
      />
      <span
        className={cn(
          "block h-[1.5px] w-5 rounded-full bg-foreground transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          open && "scale-x-0 opacity-0"
        )}
      />
      <span
        className={cn(
          "block h-[1.5px] w-5 rounded-full bg-foreground transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          open && "-translate-y-[6.5px] -rotate-45"
        )}
      />
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full pt-7 pb-5 px-5 flex justify-center bg-transparent pointer-events-none">
        <div className="pointer-events-auto flex h-[5.25rem] w-full max-w-[42rem] items-center justify-between rounded-full border border-border/60 bg-background/90 px-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <Link href="/" className="flex items-center pl-1" onClick={() => setOpen(false)}>
            <Image
              src={logo}
              alt="SPIE Student Chapter NIT Goa"
              width={168}
              height={56}
              className="h-14 w-auto object-contain rounded-sm"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "rounded-full px-[1.375rem] py-[0.4375rem] text-[0.9375rem] font-medium transition-colors hover:bg-muted",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 w-72 bg-background border-l border-border/50 shadow-2xl",
            "transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Panel Header */}
          <div className="flex h-[calc(5.25rem+1.75rem)] items-end pb-6 px-7">
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Navigation
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col px-4">
            {navigation.map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-center rounded-xl px-3 py-3.5 text-base font-medium transition-all duration-300",
                  "hover:bg-muted",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                  open
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4",
                )}
                style={{
                  transitionDelay: open ? `${150 + i * 60}ms` : "0ms",
                  transitionProperty: "opacity, transform, color, background-color",
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div
            className={cn(
              "absolute bottom-10 left-7 right-7 border-t border-border/40 pt-6",
              "transition-all duration-500",
              open ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDelay: open ? "420ms" : "0ms" }}
          >
            <p className="text-xs text-center text-muted-foreground/50 tracking-wide">
              SPIE Student Chapter · NIT Goa
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
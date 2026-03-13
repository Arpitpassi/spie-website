"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Image from "next/image"
import logo from "./image.png"

const navigation =[
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Initiatives", href: "/initiatives" },
  { name: "Events", href: "/events" },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-7 pb-5 px-5 flex justify-center bg-transparent pointer-events-none">
      <div className="pointer-events-auto flex h-[5.25rem] w-full max-w-[42rem] items-center justify-between rounded-full border border-border/60 bg-background/90 px-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <Link href="/" className="flex items-center pl-1">
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

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-[3.5rem] w-[3.5rem] rounded-full">
                <Menu className="h-[1.75rem] w-[1.75rem]" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-16">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              
              <nav className="flex flex-col gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-center text-lg font-medium transition-colors",
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
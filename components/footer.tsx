import Link from "next/link"
import Image from "next/image"
import logo from "./image.png"
import { Instagram, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={logo}
                alt="SPIE Student Chapter NIT Goa"
                width={160}
                height={54}
                className="h-14 w-auto object-contain rounded-sm"
              />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Society of Photo-Optical Instrumentation Engineers Student Chapter at NIT Goa
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                About Us
              </Link>
              <Link href="/events" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Events
              </Link>
              <Link href="/initiatives" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Initiatives
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:spie@nitgoa.ac.in"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                spie@nitgoa.ac.in
              </a>
              <a
                href="https://www.instagram.com/spie_nitg/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Instagram className="h-4 w-4" />
                @spie_nitg
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  National Institute of Technology Goa,
                  <br />
                  Cuncolim, South Goa - 403703
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SPIE@NITG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
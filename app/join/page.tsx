"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year: "1", // Default to 1st year
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      // Calls your existing API route: app/api/members/route.ts
      const response = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year), // Convert string to number for the database
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setStatus("success")
      setFormData({ name: "", email: "", phone: "", year: "1" }) // Clear form
    } catch (error: any) {
      setStatus("error")
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Join SPIE@NITG</h1>
            <p className="mt-2 text-muted-foreground">
              Become a member of the Society of Photo-Optical Instrumentation Engineers Student Chapter.
            </p>
          </div>

          {status === "success" ? (
            <div className="rounded-lg bg-primary/10 p-6 text-center text-primary border border-primary/20">
              <h3 className="text-xl font-semibold mb-2">Welcome to the club! 🎉</h3>
              <p>Your registration was successful. We will contact you soon.</p>
              <Button 
                variant="outline" 
                className="mt-6" 
                onClick={() => setStatus("idle")}
              >
                Register Another Member
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="text-sm font-medium">Full Name <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="text-sm font-medium">College Email <span className="text-destructive">*</span></label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="john@nitgoa.ac.in"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="+91 9876543210"
                  />
                </div>

                {/* Year Field */}
                <div>
                  <label className="text-sm font-medium">Year of Study <span className="text-destructive">*</span></label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </div>

              {status === "error" && (
                <div className="text-sm font-medium text-destructive">
                  Error: {errorMessage}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
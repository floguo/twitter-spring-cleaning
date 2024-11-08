'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="font-mono">Loading...</p>
      </main>
    )
  }

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold font-mono mb-8">Twitter Spring Cleaning</h1>
        <Button 
          onClick={() => signIn("twitter")}
          className="font-mono"
        >
          Sign in with Twitter
        </Button>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-mono">Twitter Spring Cleaning</h1>
          <p className="text-sm text-muted-foreground font-mono">FLOGUO LABS</p>
        </div>
        <Button 
          onClick={() => signOut()}
          className="font-mono"
        >
          Sign out
        </Button>
      </header>
      <p className="text-sm text-muted-foreground font-mono mb-8">
        LAST UPDATED: {new Date().toLocaleDateString().toUpperCase()}
      </p>
    </main>
  )
}
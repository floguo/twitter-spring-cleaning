'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { TwitterFollowingList } from "@/components/TwitterFollowingList"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Twitter Spring Cleaning</h1>
        <Button onClick={() => signIn('twitter')}>Sign in with Twitter</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Twitter Spring Cleaning</h1>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
      <TwitterFollowingList />
    </div>
  )
}
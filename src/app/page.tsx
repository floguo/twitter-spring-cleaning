'use client'

import { useSession, signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Dashboard from "@/components/Dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Twitter } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const { data: session, status } = useSession()
  const [error, setError] = useState<string | null>(null)

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const handleSignIn = async () => {
    try {
      const result = await signIn('twitter', { callbackUrl: '/', redirect: false })
      if (result?.error) {
        setError(result.error)
        console.error('Sign in error:', result.error)
      }
    } catch (error) {
      setError('An unexpected error occurred')
      console.error('Sign in error:', error)
    }
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Twitter Spring Cleaning</CardTitle>
            <CardDescription>Manage your Twitter following list</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full"
              onClick={handleSignIn}
            >
              <Twitter className="mr-2 h-4 w-4" />
              Sign in with Twitter
            </Button>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </CardContent>
        </Card>
      </div>
    )
  }

  return <Dashboard />
}
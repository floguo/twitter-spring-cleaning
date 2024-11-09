'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Twitter } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign in to Twitter Spring Cleaning</CardTitle>
          <CardDescription>Connect your Twitter account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => signIn('twitter', { callbackUrl: '/' })}
            className="w-full"
          >
            <Twitter className="mr-2 h-4 w-4" />
            Sign in with Twitter
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
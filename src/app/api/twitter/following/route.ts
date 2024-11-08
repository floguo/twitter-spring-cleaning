import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { categorizeAccount } from "@/services/categorization"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const response = await fetch('https://api.twitter.com/2/users/me/following?user.fields=description,profile_image_url', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Twitter following')
    }

    const data = await response.json()
    
    const categorizedFollowing = data.data.map((account: any) => ({
      ...account,
      category: categorizeAccount(account.description || '')
    }))

    return NextResponse.json(categorizedFollowing)
  } catch (error) {
    console.error('Error fetching Twitter following:', error)
    return NextResponse.json({ error: 'Failed to fetch Twitter following' }, { status: 500 })
  }
}
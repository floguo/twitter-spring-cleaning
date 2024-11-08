'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface TwitterAccount {
  id: string
  name: string
  username: string
  profile_image_url: string
  description: string
  category: string
}

export function TwitterFollowingList() {
  const { data: session } = useSession()
  const [following, setFollowing] = useState<TwitterAccount[]>([])
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFollowing = async () => {
      if (session?.accessToken) {
        try {
          const response = await fetch('/api/twitter/following')
          if (!response.ok) {
            throw new Error('Failed to fetch following')
          }
          const data = await response.json()
          setFollowing(data)
        } catch (error) {
          console.error('Error fetching following:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchFollowing()
  }, [session])

  const handleAccountSelect = (id: string) => {
    setSelectedAccounts(prev => 
      prev.includes(id) ? prev.filter(accId => accId !== id) : [...prev, id]
    )
  }

  const handleBatchUnfollow = async () => {
    // TODO: Implement batch unfollow logic
    console.log('Unfollowing:', selectedAccounts)
    setSelectedAccounts([])
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {following.map(account => (
          <Card key={account.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={account.profile_image_url} alt={account.name} />
                <AvatarFallback>{account.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{account.name}</CardTitle>
                <CardDescription>{account.username}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">{account.description}</p>
              <Badge>{account.category}</Badge>
            </CardContent>
            <CardFooter>
              <Checkbox 
                id={`select-${account.id}`}
                checked={selectedAccounts.includes(account.id)}
                onCheckedChange={() => handleAccountSelect(account.id)}
              />
              <label htmlFor={`select-${account.id}`} className="ml-2 text-sm">
                Select for spring cleaning
              </label>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Button onClick={handleBatchUnfollow} disabled={selectedAccounts.length === 0}>
        Unfollow Selected ({selectedAccounts.length})
      </Button>
    </div>
  )
}
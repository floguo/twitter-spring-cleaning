'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useVirtualizer } from '@tanstack/react-virtual'
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
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  const fetchFollowing = useCallback(async (cursor?: string) => {
    if (session?.accessToken) {
      try {
        const response = await fetch(`/api/twitter/following${cursor ? `?cursor=${cursor}` : ''}`)
        if (!response.ok) {
          throw new Error('Failed to fetch following')
        }
        const data = await response.json()
        setFollowing(prev => [...prev, ...data.accounts])
        if (data.next_cursor) {
          await fetchFollowing(data.next_cursor)
        }
      } catch (error) {
        console.error('Error fetching following:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [session])

  useEffect(() => {
    fetchFollowing()
  }, [fetchFollowing])

  const handleAccountSelect = useCallback((id: string) => {
    setSelectedAccounts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }, [])

  const handleBatchUnfollow = async () => {
    // TODO: Implement batch unfollow logic
    console.log('Unfollowing:', Array.from(selectedAccounts))
    setSelectedAccounts(new Set())
  }

  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: following.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const account = following[virtualRow.index]
            return (
              <div
                key={account.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <Card>
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
                      checked={selectedAccounts.has(account.id)}
                      onCheckedChange={() => handleAccountSelect(account.id)}
                    />
                    <label htmlFor={`select-${account.id}`} className="ml-2 text-sm">
                      Select for spring cleaning
                    </label>
                  </CardFooter>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
      <Button onClick={handleBatchUnfollow} disabled={selectedAccounts.size === 0}>
        Unfollow Selected ({selectedAccounts.size})
      </Button>
    </div>
  )
}
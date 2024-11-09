'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FollowingAnalytics from "@/components/FollowingAnalytics"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Twitter, Home, Users, BarChart2, Settings, LogOut } from 'lucide-react'

// Mock data for following list
const mockFollowing = [
  { id: 1, name: 'John Doe', username: '@johndoe', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 2, name: 'Jane Smith', username: '@janesmith', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 3, name: 'Tech News', username: '@technews', avatar: '/placeholder.svg?height=40&width=40' },
  // Add more mock data as needed
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Twitter Cleaner</h1>
        </div>
        <nav className="mt-6">
          {[
            { name: 'Home', icon: Home, id: 'home' },
            { name: 'Following', icon: Users, id: 'following' },
            { name: 'Analytics', icon: BarChart2, id: 'analytics' },
            { name: 'Settings', icon: Settings, id: 'settings' },
          ].map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">Dashboard</h2>
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" className="ml-2">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {activeTab === 'home' && (
            <div className="space-y-6">
              <FollowingAnalytics />
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Following</h3>
                  <ul className="space-y-4">
                    {mockFollowing.map((user) => (
                      <li key={user.id} className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.username}</p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto">
                          Unfollow
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === 'following' && <div>Following List (To be implemented)</div>}
          {activeTab === 'analytics' && <FollowingAnalytics />}
          {activeTab === 'settings' && <div>Settings (To be implemented)</div>}
        </main>
      </div>
    </div>
  )
}
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type AnalyticsData = {
  totalFollowing: number
  activeLastMonth: number
  inactiveAccounts: number
  verifiedAccounts: number
}

// This can be replaced with real data later
const mockData: AnalyticsData = {
  totalFollowing: 1234,
  activeLastMonth: 890,
  inactiveAccounts: 234,
  verifiedAccounts: 456
}

export default function FollowingAnalytics() {
  const activePercentage = (mockData.activeLastMonth / mockData.totalFollowing) * 100
  const verifiedPercentage = (mockData.verifiedAccounts / mockData.totalFollowing) * 100

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Following</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.totalFollowing}</div>
          <p className="text-xs text-muted-foreground">Accounts you follow</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.activeLastMonth}</div>
          <div className="mt-4 space-y-2">
            <Progress value={activePercentage} />
            <p className="text-xs text-muted-foreground">
              {activePercentage.toFixed(1)}% active in last month
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inactive Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.inactiveAccounts}</div>
          <p className="text-xs text-muted-foreground">No activity in 3+ months</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Verified Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.verifiedAccounts}</div>
          <div className="mt-4 space-y-2">
            <Progress value={verifiedPercentage} />
            <p className="text-xs text-muted-foreground">
              {verifiedPercentage.toFixed(1)}% of total following
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
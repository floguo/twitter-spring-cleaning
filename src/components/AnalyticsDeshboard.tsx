import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AnalyticsDashboard() {
  // TODO: Implement actual analytics logic
  const categoryCounts = {
    Technology: 10,
    Sports: 5,
    Food: 8,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Following Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {Object.entries(categoryCounts).map(([category, count]) => (
            <li key={category} className="mb-2">
              {category}: {count}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
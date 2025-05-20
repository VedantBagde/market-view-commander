
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  type: "buy" | "sell";
  symbol: string;
  amount: string;
  price: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="crypto-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                <div className="flex items-center">
                  <Badge 
                    className={`mr-3 ${
                      activity.type === "buy" ? "bg-crypto-green" : "bg-crypto-red"
                    }`}
                  >
                    {activity.type.toUpperCase()}
                  </Badge>
                  <div>
                    <div className="font-medium">{activity.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      {activity.timestamp}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{activity.amount}</div>
                  <div className="text-sm text-muted-foreground">
                    ${activity.price}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No recent activity
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentActivity;

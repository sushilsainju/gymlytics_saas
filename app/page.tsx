import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Users, CreditCard, Calendar, TrendingUp, Activity, UserCheck, Dumbbell } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-600">Welcome back! Here's what's happening at your gym.</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Avatar>
                <AvatarImage src="/gym-owner-profile.png" />
                <AvatarFallback>GO</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Members</CardTitle>
                <Users className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">1,247</div>
                <p className="text-xs text-emerald-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Active Subscriptions</CardTitle>
                <CreditCard className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">1,089</div>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Upcoming Renewals</CardTitle>
                <Calendar className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">47</div>
                <p className="text-xs text-slate-500 mt-1">Next 7 days</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Today's Sessions</CardTitle>
                <Activity className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">156</div>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5% from yesterday
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Dumbbell className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-sm text-slate-600">Workout Sessions Completed</span>
                  </div>
                  <span className="font-semibold text-slate-900">342</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <UserCheck className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-slate-600">Nutrition Plan Adherence</span>
                  </div>
                  <span className="font-semibold text-slate-900">87%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-sm text-slate-600">Trainers Available</span>
                  </div>
                  <span className="font-semibold text-slate-900">12/15</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/member-profile.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">John Doe completed chest workout</p>
                    <p className="text-xs text-slate-500">2 minutes ago</p>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    Workout
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/female-member-profile.png" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">Sarah Miller renewed subscription</p>
                    <p className="text-xs text-slate-500">15 minutes ago</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Subscription
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/trainer-profile.png" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">Mike Johnson updated nutrition plan</p>
                    <p className="text-xs text-slate-500">1 hour ago</p>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Nutrition
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Renewals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Upcoming Renewals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Alex Thompson", plan: "Premium", expires: "Dec 15, 2024", status: "expiring" },
                  { name: "Emma Wilson", plan: "Basic", expires: "Dec 16, 2024", status: "expiring" },
                  { name: "David Chen", plan: "Premium", expires: "Dec 18, 2024", status: "upcoming" },
                  { name: "Lisa Rodriguez", plan: "Standard", expires: "Dec 20, 2024", status: "upcoming" },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/community-member.png?height=32&width=32&query=member ${member.name}`}
                        />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.plan} Plan</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-900">{member.expires}</p>
                      <Badge
                        variant={member.status === "expiring" ? "destructive" : "secondary"}
                        className={member.status === "expiring" ? "" : "bg-amber-100 text-amber-700"}
                      >
                        {member.status === "expiring" ? "Expiring Soon" : "Upcoming"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

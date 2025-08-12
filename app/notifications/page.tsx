"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, AlertTriangle, CreditCard, Users, Calendar, CheckCircle, X, Search, Filter } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "payment",
    title: "Payment Overdue",
    message: "Sarah Johnson's membership payment is 5 days overdue",
    time: "2 hours ago",
    read: false,
    priority: "high",
    member: "Sarah Johnson",
  },
  {
    id: 2,
    type: "membership",
    title: "Membership Expiring Soon",
    message: "3 memberships expire in the next 7 days",
    time: "4 hours ago",
    read: false,
    priority: "medium",
    count: 3,
  },
  {
    id: 3,
    type: "system",
    title: "New Member Registration",
    message: "Alex Chen has completed registration and needs trainer assignment",
    time: "6 hours ago",
    read: true,
    priority: "low",
    member: "Alex Chen",
  },
  {
    id: 4,
    type: "trainer",
    title: "Trainer Schedule Update",
    message: "Mike Wilson updated his availability for next week",
    time: "1 day ago",
    read: true,
    priority: "low",
    trainer: "Mike Wilson",
  },
  {
    id: 5,
    type: "payment",
    title: "Payment Received",
    message: "Emma Davis paid $89 for Premium membership renewal",
    time: "1 day ago",
    read: false,
    priority: "low",
    member: "Emma Davis",
    amount: "$89",
  },
  {
    id: 6,
    type: "system",
    title: "Equipment Maintenance Due",
    message: "Treadmill #3 is due for monthly maintenance check",
    time: "2 days ago",
    read: true,
    priority: "medium",
    equipment: "Treadmill #3",
  },
  {
    id: 7,
    type: "membership",
    title: "Membership Cancelled",
    message: "John Smith cancelled his Basic membership",
    time: "3 days ago",
    read: true,
    priority: "medium",
    member: "John Smith",
  },
  {
    id: 8,
    type: "trainer",
    title: "Training Session Completed",
    message: "Lisa Anderson completed session with 5 members",
    time: "3 days ago",
    read: true,
    priority: "low",
    trainer: "Lisa Anderson",
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "payment":
      return <CreditCard className="h-4 w-4" />
    case "membership":
      return <Users className="h-4 w-4" />
    case "trainer":
      return <Calendar className="h-4 w-4" />
    case "system":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [notificationList, setNotificationList] = useState(notifications)

  const filteredNotifications = notificationList.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || notification.type === filterType
    const matchesPriority = filterPriority === "all" || notification.priority === filterPriority

    return matchesSearch && matchesType && matchesPriority
  })

  const unreadCount = notificationList.filter((n) => !n.read).length
  const highPriorityCount = notificationList.filter((n) => n.priority === "high" && !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-600 mt-1">Stay updated with gym activities and important alerts</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                {unreadCount} Unread
              </Badge>
              {highPriorityCount > 0 && <Badge variant="destructive">{highPriorityCount} High Priority</Badge>}
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search notifications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="membership">Membership</SelectItem>
                      <SelectItem value="trainer">Trainer</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Bell className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                    <p className="text-gray-600 text-center">
                      {searchTerm || filterType !== "all" || filterPriority !== "all"
                        ? "Try adjusting your filters to see more notifications."
                        : "You're all caught up! New notifications will appear here."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`transition-all hover:shadow-md ${
                      !notification.read ? "border-l-4 border-l-emerald-500 bg-emerald-50/30" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className={`p-2 rounded-full ${
                              notification.type === "payment"
                                ? "bg-blue-100 text-blue-600"
                                : notification.type === "membership"
                                  ? "bg-purple-100 text-purple-600"
                                  : notification.type === "trainer"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-orange-100 text-orange-600"
                            }`}
                          >
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                                {notification.title}
                              </h3>
                              <Badge variant="outline" className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </Badge>
                              {!notification.read && <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{notification.time}</span>
                              {notification.member && (
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {notification.member}
                                </span>
                              )}
                              {notification.trainer && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {notification.trainer}
                                </span>
                              )}
                              {notification.amount && (
                                <span className="flex items-center gap-1">
                                  <CreditCard className="h-3 w-3" />
                                  {notification.amount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

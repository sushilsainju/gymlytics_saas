"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, Mail, Phone, Calendar, TrendingUp, User } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

// Mock data for members
const members = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "/member-profile.png",
    subscriptionType: "Premium",
    subscriptionStatus: "Active",
    subscriptionExpiry: "2025-03-15",
    trainer: "Mike Johnson",
    joinDate: "2024-01-15",
    lastVisit: "2024-12-10",
    workoutsSessions: 45,
    progressScore: 87,
  },
  {
    id: 2,
    name: "Sarah Miller",
    email: "sarah.miller@email.com",
    phone: "+1 (555) 234-5678",
    avatar: "/female-member-profile.png",
    subscriptionType: "Standard",
    subscriptionStatus: "Active",
    subscriptionExpiry: "2025-02-20",
    trainer: "Lisa Rodriguez",
    joinDate: "2024-02-10",
    lastVisit: "2024-12-11",
    workoutsSessions: 32,
    progressScore: 92,
  },
  {
    id: 3,
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 345-6789",
    avatar: "/community-member.png",
    subscriptionType: "Premium",
    subscriptionStatus: "Expiring",
    subscriptionExpiry: "2024-12-15",
    trainer: "Mike Johnson",
    joinDate: "2023-12-01",
    lastVisit: "2024-12-09",
    workoutsSessions: 78,
    progressScore: 95,
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    phone: "+1 (555) 456-7890",
    avatar: "/trainer-profile.png",
    subscriptionType: "Basic",
    subscriptionStatus: "Expiring",
    subscriptionExpiry: "2024-12-16",
    trainer: "David Chen",
    joinDate: "2024-03-20",
    lastVisit: "2024-12-08",
    workoutsSessions: 28,
    progressScore: 73,
  },
  {
    id: 5,
    name: "David Chen",
    email: "david.chen@email.com",
    phone: "+1 (555) 567-8901",
    avatar: "/gym-owner-profile.png",
    subscriptionType: "Standard",
    subscriptionStatus: "Inactive",
    subscriptionExpiry: "2024-11-30",
    trainer: "Lisa Rodriguez",
    joinDate: "2024-04-05",
    lastVisit: "2024-11-25",
    workoutsSessions: 15,
    progressScore: 45,
  },
  {
    id: 6,
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@email.com",
    phone: "+1 (555) 678-9012",
    avatar: "/female-member-profile.png",
    subscriptionType: "Premium",
    subscriptionStatus: "Active",
    subscriptionExpiry: "2025-04-10",
    trainer: "Mike Johnson",
    joinDate: "2024-05-12",
    lastVisit: "2024-12-11",
    workoutsSessions: 38,
    progressScore: 89,
  },
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || member.subscriptionStatus.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || member.subscriptionType.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-100 text-emerald-700"
      case "expiring":
        return "bg-amber-100 text-amber-700"
      case "inactive":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "premium":
        return "bg-purple-100 text-purple-700"
      case "standard":
        return "bg-blue-100 text-blue-700"
      case "basic":
        return "bg-slate-100 text-slate-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Members</h1>
              <p className="text-slate-600">Manage your gym members and their subscriptions</p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
        </header>

        {/* Filters and Search */}
        <div className="p-6 bg-white border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search members by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expiring">Expiring</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <main className="flex-1 p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing {filteredMembers.length} of {members.length} members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-slate-900">{member.name}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className={getStatusColor(member.subscriptionStatus)}>
                          {member.subscriptionStatus}
                        </Badge>
                        <Badge variant="secondary" className={getTypeColor(member.subscriptionType)}>
                          {member.subscriptionType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="h-3 w-3" />
                      <span>{member.phone}</span>
                    </div>
                  </div>

                  {/* Subscription Info */}
                  <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Expires:</span>
                      <span className="font-medium text-slate-900">
                        {new Date(member.subscriptionExpiry).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Trainer:</span>
                      <span className="font-medium text-slate-900">{member.trainer}</span>
                    </div>
                  </div>

                  {/* Progress Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">{member.workoutsSessions}</div>
                      <div className="text-xs text-slate-500">Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-lg font-bold text-slate-900">{member.progressScore}%</span>
                        <TrendingUp className="h-3 w-3 text-emerald-600" />
                      </div>
                      <div className="text-xs text-slate-500">Progress</div>
                    </div>
                  </div>

                  {/* Last Visit */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <Calendar className="h-3 w-3" />
                    <span>Last visit: {new Date(member.lastVisit).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No members found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

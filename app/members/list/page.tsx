"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Plus, Mail, Phone, Calendar, TrendingUp, LayoutGrid, List, Eye } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import Link from "next/link"

// Mock data for members (same as card view)
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

export default function MembersListPage() {
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
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <Link href="/members">
                  <Button variant="ghost" size="sm" className="h-8 px-3">
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="h-8 px-3 bg-white shadow-sm">
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
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

        {/* Members Table */}
        <main className="flex-1 p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing {filteredMembers.length} of {members.length} members
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-900">Member</TableHead>
                  <TableHead className="font-semibold text-slate-900">Contact</TableHead>
                  <TableHead className="font-semibold text-slate-900">Subscription</TableHead>
                  <TableHead className="font-semibold text-slate-900">Trainer</TableHead>
                  <TableHead className="font-semibold text-slate-900">Progress</TableHead>
                  <TableHead className="font-semibold text-slate-900">Last Visit</TableHead>
                  <TableHead className="font-semibold text-slate-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-slate-900">{member.name}</div>
                          <div className="text-sm text-slate-500">
                            Joined {new Date(member.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="h-3 w-3" />
                          <span className="truncate max-w-[200px]">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="h-3 w-3" />
                          <span>{member.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Badge variant="secondary" className={getStatusColor(member.subscriptionStatus)}>
                            {member.subscriptionStatus}
                          </Badge>
                          <Badge variant="secondary" className={getTypeColor(member.subscriptionType)}>
                            {member.subscriptionType}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-600">
                          Expires: {new Date(member.subscriptionExpiry).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-900">{member.trainer}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900">{member.progressScore}%</span>
                          <TrendingUp className="h-3 w-3 text-emerald-600" />
                        </div>
                        <div className="text-sm text-slate-500">{member.workoutsSessions} sessions</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(member.lastVisit).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link href={`/members/${member.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
              <div className="text-slate-400 mb-4">
                <List className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No members found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

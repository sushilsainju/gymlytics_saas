"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, Plus, Apple, Users, Clock } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

// Mock data for nutrition plans
const nutritionPlans = [
  {
    id: 1,
    name: "High Protein Weight Loss",
    description: "Designed for muscle preservation during weight loss with high protein intake",
    goal: "Weight Loss",
    calories: 2200,
    protein: 165,
    carbs: 220,
    fat: 73,
    mealsPerDay: 6,
    assignedMembers: 12,
    createdBy: "Sarah Thompson",
    createdDate: "2024-11-15",
    status: "Active",
    memberNames: ["John Doe", "Alex Thompson", "Lisa Rodriguez"],
  },
  {
    id: 2,
    name: "Muscle Building Bulk",
    description: "High calorie plan for lean muscle gain with balanced macronutrients",
    goal: "Muscle Gain",
    calories: 3200,
    protein: 200,
    carbs: 400,
    fat: 107,
    mealsPerDay: 5,
    assignedMembers: 8,
    createdBy: "Mike Johnson",
    createdDate: "2024-11-10",
    status: "Active",
    memberNames: ["David Chen", "Michael Brown", "Robert Taylor"],
  },
  {
    id: 3,
    name: "Balanced Maintenance",
    description: "Well-rounded nutrition plan for maintaining current weight and health",
    goal: "Maintenance",
    calories: 2500,
    protein: 125,
    carbs: 313,
    fat: 83,
    mealsPerDay: 4,
    assignedMembers: 15,
    createdBy: "Sarah Thompson",
    createdDate: "2024-11-05",
    status: "Active",
    memberNames: ["Sarah Miller", "Emma Wilson", "Jennifer Lee"],
  },
  {
    id: 4,
    name: "Keto Fat Loss",
    description: "Low carb, high fat ketogenic approach for rapid fat loss",
    goal: "Weight Loss",
    calories: 1800,
    protein: 135,
    carbs: 45,
    fat: 140,
    mealsPerDay: 3,
    assignedMembers: 6,
    createdBy: "Lisa Rodriguez",
    createdDate: "2024-10-28",
    status: "Draft",
    memberNames: ["Amanda Davis", "Kevin Martinez"],
  },
]

const sampleMeals = [
  { time: "7:00 AM", meal: "Breakfast", calories: 450, protein: 25, carbs: 45, fat: 18 },
  { time: "10:00 AM", meal: "Mid-Morning Snack", calories: 200, protein: 15, carbs: 20, fat: 8 },
  { time: "1:00 PM", meal: "Lunch", calories: 600, protein: 40, carbs: 55, fat: 22 },
  { time: "4:00 PM", meal: "Afternoon Snack", calories: 250, protein: 20, carbs: 25, fat: 10 },
  { time: "7:00 PM", meal: "Dinner", calories: 550, protein: 45, carbs: 50, fat: 18 },
  { time: "9:00 PM", meal: "Evening Snack", calories: 150, protein: 20, carbs: 15, fat: 5 },
]

export default function NutritionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [goalFilter, setGoalFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredPlans = nutritionPlans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGoal = goalFilter === "all" || plan.goal.toLowerCase() === goalFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || plan.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesGoal && matchesStatus
  })

  const getGoalColor = (goal: string) => {
    switch (goal.toLowerCase()) {
      case "weight loss":
        return "bg-red-100 text-red-700"
      case "muscle gain":
        return "bg-blue-100 text-blue-700"
      case "maintenance":
        return "bg-emerald-100 text-emerald-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-100 text-emerald-700"
      case "draft":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const handleViewPlan = (plan: any) => {
    setSelectedPlan(plan)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Nutrition Plans</h1>
              <p className="text-slate-600">Create and manage customizable nutrition plans for members</p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Plan
            </Button>
          </div>
        </header>

        {/* Summary Stats */}
        <div className="p-6 bg-white border-b border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {nutritionPlans.filter((p) => p.status === "Active").length}
              </div>
              <div className="text-sm text-slate-600">Active Plans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">
                {nutritionPlans.reduce((sum, p) => sum + p.assignedMembers, 0)}
              </div>
              <div className="text-sm text-slate-600">Total Assignments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {nutritionPlans.filter((p) => p.goal === "Muscle Gain").length}
              </div>
              <div className="text-sm text-slate-600">Muscle Gain Plans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {nutritionPlans.filter((p) => p.goal === "Weight Loss").length}
              </div>
              <div className="text-sm text-slate-600">Weight Loss Plans</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 bg-white border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search nutrition plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={goalFilter} onValueChange={setGoalFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Goals</SelectItem>
                  <SelectItem value="weight loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle gain">Muscle Gain</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <main className="flex-1 p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing {filteredPlans.length} of {nutritionPlans.length} nutrition plans
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPlans.map((plan) => (
              <Card
                key={plan.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleViewPlan(plan)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-slate-900">{plan.name}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className={getGoalColor(plan.goal)}>
                        {plan.goal}
                      </Badge>
                      <Badge variant="secondary" className={getStatusColor(plan.status)}>
                        {plan.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Macros */}
                  <div className="grid grid-cols-4 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold text-slate-900">{plan.calories}</div>
                      <div className="text-xs text-slate-500">Calories</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">{plan.protein}g</div>
                      <div className="text-xs text-slate-500">Protein</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-emerald-600">{plan.carbs}g</div>
                      <div className="text-xs text-slate-500">Carbs</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-amber-600">{plan.fat}g</div>
                      <div className="text-xs text-slate-500">Fat</div>
                    </div>
                  </div>

                  {/* Plan Details */}
                  <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Meals per day:</span>
                      <span className="font-medium text-slate-900">{plan.mealsPerDay}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Created by:</span>
                      <span className="font-medium text-slate-900">{plan.createdBy}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Created:</span>
                      <span className="font-medium text-slate-900">
                        {new Date(plan.createdDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Assigned Members */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Assigned Members</span>
                      <Badge variant="outline" className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        {plan.assignedMembers}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {plan.memberNames.slice(0, 3).map((memberName, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {memberName}
                        </Badge>
                      ))}
                      {plan.assignedMembers > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{plan.assignedMembers - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <Apple className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No nutrition plans found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </main>
      </div>

      {/* Create Plan Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Nutrition Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plan-name">Plan Name</Label>
                <Input id="plan-name" placeholder="e.g., High Protein Weight Loss" />
              </div>
              <div>
                <Label htmlFor="goal">Goal</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe the nutrition plan..." rows={3} />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input id="calories" type="number" placeholder="2200" />
              </div>
              <div>
                <Label htmlFor="protein">Protein (g)</Label>
                <Input id="protein" type="number" placeholder="165" />
              </div>
              <div>
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input id="carbs" type="number" placeholder="220" />
              </div>
              <div>
                <Label htmlFor="fat">Fat (g)</Label>
                <Input id="fat" type="number" placeholder="73" />
              </div>
            </div>

            <div>
              <Label htmlFor="meals">Meals per Day</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select meals per day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Meals</SelectItem>
                  <SelectItem value="4">4 Meals</SelectItem>
                  <SelectItem value="5">5 Meals</SelectItem>
                  <SelectItem value="6">6 Meals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Create Plan</Button>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Plan Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedPlan?.name}</DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <div className="space-y-6">
              <div className="flex gap-2">
                <Badge className={getGoalColor(selectedPlan.goal)}>{selectedPlan.goal}</Badge>
                <Badge className={getStatusColor(selectedPlan.status)}>{selectedPlan.status}</Badge>
              </div>

              <p className="text-slate-600">{selectedPlan.description}</p>

              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">{selectedPlan.calories}</div>
                  <div className="text-sm text-slate-600">Calories</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedPlan.protein}g</div>
                  <div className="text-sm text-slate-600">Protein</div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{selectedPlan.carbs}g</div>
                  <div className="text-sm text-slate-600">Carbs</div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{selectedPlan.fat}g</div>
                  <div className="text-sm text-slate-600">Fat</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Sample Daily Schedule</h4>
                <div className="space-y-2">
                  {sampleMeals.slice(0, selectedPlan.mealsPerDay).map((meal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-900">{meal.meal}</p>
                          <p className="text-sm text-slate-600">{meal.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-900">{meal.calories} cal</p>
                        <p className="text-xs text-slate-600">
                          P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Assign to Members</Button>
                <Button variant="outline">Edit Plan</Button>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

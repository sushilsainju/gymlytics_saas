"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, Plus, Dumbbell, Users } from "lucide-react";
import { Sidebar } from "@/components/sidebar";

interface WorkoutPlan {
  id: number;
  name: string;
  description: string;
  focus: string;
  difficulty: string;
  duration: number;
  sessionsPerWeek: number;
  assignedMembers: number;
  createdBy: string;
  createdDate: string;
  status: string;
  memberNames: string[];
  exercises: Exercise[];
}

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

// Mock data for workout plans
const workoutPlans = [
  {
    id: 1,
    name: "Strength & Conditioning",
    description:
      "Comprehensive strength training program for building muscle and power",
    focus: "Strength",
    difficulty: "Intermediate",
    duration: 60,
    sessionsPerWeek: 4,
    assignedMembers: 18,
    createdBy: "Mike Johnson",
    createdDate: "2024-11-12",
    status: "Active",
    memberNames: ["John Doe", "Alex Thompson", "David Chen"],
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8-10", rest: "2-3 min" },
      { name: "Squats", sets: 4, reps: "6-8", rest: "3 min" },
      { name: "Deadlifts", sets: 3, reps: "5-6", rest: "3-4 min" },
      { name: "Pull-ups", sets: 3, reps: "8-12", rest: "2 min" },
    ],
  },
  {
    id: 2,
    name: "HIIT Fat Burner",
    description:
      "High-intensity interval training for maximum calorie burn and cardiovascular fitness",
    focus: "Cardio",
    difficulty: "Advanced",
    duration: 45,
    sessionsPerWeek: 3,
    assignedMembers: 12,
    createdBy: "David Chen",
    createdDate: "2024-11-08",
    status: "Active",
    memberNames: ["Sarah Miller", "Emma Wilson", "Lisa Rodriguez"],
    exercises: [
      { name: "Burpees", sets: 4, reps: "30 sec", rest: "30 sec" },
      { name: "Mountain Climbers", sets: 4, reps: "30 sec", rest: "30 sec" },
      { name: "Jump Squats", sets: 4, reps: "30 sec", rest: "30 sec" },
      { name: "High Knees", sets: 4, reps: "30 sec", rest: "30 sec" },
    ],
  },
  {
    id: 3,
    name: "Beginner Full Body",
    description:
      "Perfect introduction to weight training with fundamental movements",
    focus: "General Fitness",
    difficulty: "Beginner",
    duration: 45,
    sessionsPerWeek: 3,
    assignedMembers: 22,
    createdBy: "Lisa Rodriguez",
    createdDate: "2024-11-01",
    status: "Active",
    memberNames: ["Michael Brown", "Jennifer Lee", "Amanda Davis"],
    exercises: [
      { name: "Goblet Squats", sets: 3, reps: "12-15", rest: "1-2 min" },
      { name: "Push-ups", sets: 3, reps: "8-12", rest: "1-2 min" },
      { name: "Bent-over Rows", sets: 3, reps: "10-12", rest: "1-2 min" },
      { name: "Plank", sets: 3, reps: "30-60 sec", rest: "1 min" },
    ],
  },
  {
    id: 4,
    name: "Yoga Flow Flexibility",
    description:
      "Gentle yoga sequences for improved flexibility and mindfulness",
    focus: "Flexibility",
    difficulty: "Beginner",
    duration: 60,
    sessionsPerWeek: 2,
    assignedMembers: 8,
    createdBy: "Lisa Rodriguez",
    createdDate: "2024-10-25",
    status: "Draft",
    memberNames: ["Rachel Green", "Sophie Anderson"],
    exercises: [
      { name: "Sun Salutation", sets: 3, reps: "5 rounds", rest: "30 sec" },
      { name: "Warrior Poses", sets: 2, reps: "Hold 30 sec", rest: "15 sec" },
      { name: "Downward Dog", sets: 3, reps: "Hold 45 sec", rest: "15 sec" },
      { name: "Child's Pose", sets: 1, reps: "Hold 2 min", rest: "N/A" },
    ],
  },
];

export default function WorkoutsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [focusFilter, setFocusFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredPlans = workoutPlans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFocus =
      focusFilter === "all" ||
      plan.focus.toLowerCase() === focusFilter.toLowerCase();
    const matchesDifficulty =
      difficultyFilter === "all" ||
      plan.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    const matchesStatus =
      statusFilter === "all" ||
      plan.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesFocus && matchesDifficulty && matchesStatus;
  });

  const getFocusColor = (focus: string) => {
    switch (focus.toLowerCase()) {
      case "strength":
        return "bg-red-100 text-red-700";
      case "cardio":
        return "bg-blue-100 text-blue-700";
      case "flexibility":
        return "bg-purple-100 text-purple-700";
      case "general fitness":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-emerald-100 text-emerald-700";
      case "intermediate":
        return "bg-amber-100 text-amber-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-100 text-emerald-700";
      case "draft":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const handleViewPlan = (plan: WorkoutPlan) => {
    setSelectedPlan(plan);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Workout Plans
              </h1>
              <p className="text-slate-600">
                Create and manage customizable workout routines for members
              </p>
            </div>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => setIsCreateDialogOpen(true)}
            >
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
                {workoutPlans.filter((p) => p.status === "Active").length}
              </div>
              <div className="text-sm text-slate-600">Active Plans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">
                {workoutPlans.reduce((sum, p) => sum + p.assignedMembers, 0)}
              </div>
              <div className="text-sm text-slate-600">Total Assignments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {workoutPlans.filter((p) => p.focus === "Strength").length}
              </div>
              <div className="text-sm text-slate-600">Strength Plans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {workoutPlans.filter((p) => p.focus === "Cardio").length}
              </div>
              <div className="text-sm text-slate-600">Cardio Plans</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 bg-white border-b border-slate-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search workout plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={focusFilter} onValueChange={setFocusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Focus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Focus</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="general fitness">
                    General Fitness
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
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
              Showing {filteredPlans.length} of {workoutPlans.length} workout
              plans
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
                    <CardTitle className="text-lg font-semibold text-slate-900">
                      {plan.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge
                        variant="secondary"
                        className={getFocusColor(plan.focus)}
                      >
                        {plan.focus}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={getDifficultyColor(plan.difficulty)}
                      >
                        {plan.difficulty}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(plan.status)}
                      >
                        {plan.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Plan Stats */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold text-slate-900">
                        {plan.duration}
                      </div>
                      <div className="text-xs text-slate-500">Minutes</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">
                        {plan.sessionsPerWeek}
                      </div>
                      <div className="text-xs text-slate-500">Per Week</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-emerald-600">
                        {plan.exercises.length}
                      </div>
                      <div className="text-xs text-slate-500">Exercises</div>
                    </div>
                  </div>

                  {/* Plan Details */}
                  <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Created by:</span>
                      <span className="font-medium text-slate-900">
                        {plan.createdBy}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Created:</span>
                      <span className="font-medium text-slate-900">
                        {new Date(plan.createdDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Sample Exercises */}
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">
                      Sample Exercises
                    </p>
                    <div className="space-y-1">
                      {plan.exercises.slice(0, 3).map((exercise, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-slate-600">
                            {exercise.name}
                          </span>
                          <span className="font-medium text-slate-900">
                            {exercise.sets} × {exercise.reps}
                          </span>
                        </div>
                      ))}
                      {plan.exercises.length > 3 && (
                        <p className="text-xs text-slate-500">
                          +{plan.exercises.length - 3} more exercises
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Assigned Members */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">
                        Assigned Members
                      </span>
                      <Badge variant="outline" className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        {plan.assignedMembers}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {plan.memberNames.slice(0, 3).map((memberName, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
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
              <Dumbbell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No workout plans found
              </h3>
              <p className="text-slate-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Create Plan Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Workout Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plan-name">Plan Name</Label>
                <Input
                  id="plan-name"
                  placeholder="e.g., Strength & Conditioning"
                />
              </div>
              <div>
                <Label htmlFor="focus">Focus</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strength">Strength</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="flexibility">Flexibility</SelectItem>
                    <SelectItem value="general-fitness">
                      General Fitness
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the workout plan..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration (min)</Label>
                <Input id="duration" type="number" placeholder="60" />
              </div>
              <div>
                <Label htmlFor="sessions">Sessions/Week</Label>
                <Input id="sessions" type="number" placeholder="4" />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                Create Plan
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
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
                <Badge className={getFocusColor(selectedPlan.focus)}>
                  {selectedPlan.focus}
                </Badge>
                <Badge className={getDifficultyColor(selectedPlan.difficulty)}>
                  {selectedPlan.difficulty}
                </Badge>
                <Badge className={getStatusColor(selectedPlan.status)}>
                  {selectedPlan.status}
                </Badge>
              </div>

              <p className="text-slate-600">{selectedPlan.description}</p>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">
                    {selectedPlan.duration}
                  </div>
                  <div className="text-sm text-slate-600">Minutes</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedPlan.sessionsPerWeek}
                  </div>
                  <div className="text-sm text-slate-600">Per Week</div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">
                    {selectedPlan.exercises.length}
                  </div>
                  <div className="text-sm text-slate-600">Exercises</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-3">
                  Exercise List
                </h4>
                <div className="space-y-2">
                  {selectedPlan.exercises.map(
                    (exercise: Exercise, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Dumbbell className="h-4 w-4 text-slate-400" />
                          <div>
                            <p className="font-medium text-slate-900">
                              {exercise.name}
                            </p>
                            <p className="text-sm text-slate-600">
                              Rest: {exercise.rest}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-slate-900">
                            {exercise.sets} sets × {exercise.reps}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Assign to Members
                </Button>
                <Button variant="outline">Edit Plan</Button>
                <Button
                  variant="outline"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Mail,
  Phone,
  CreditCard,
  Apple,
  Dumbbell,
  MessageSquare,
  Edit,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";

// Mock member data - in real app this would come from API
const memberData = {
  id: 1,
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  avatar: "/member-profile.png",
  joinDate: "2024-01-15",
  lastVisit: "2024-12-10",
  subscription: {
    type: "Premium",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2025-03-15",
    paymentStatus: "Paid",
    monthlyFee: 89.99,
    nextPayment: "2025-01-15",
  },
  trainer: {
    name: "Mike Johnson",
    avatar: "/trainer-profile.png",
    specialties: ["Strength Training", "Weight Loss"],
  },
  stats: {
    workoutsSessions: 45,
    progressScore: 87,
    weightLoss: 12,
    muscleGain: 8,
  },
  nutritionPlan: {
    currentPlan: "High Protein Weight Loss",
    calories: 2200,
    protein: 165,
    carbs: 220,
    fat: 73,
    adherence: 87,
    meals: [
      {
        time: "7:00 AM",
        meal: "Breakfast",
        calories: 450,
        status: "completed",
      },
      {
        time: "10:00 AM",
        meal: "Mid-Morning Snack",
        calories: 200,
        status: "completed",
      },
      { time: "1:00 PM", meal: "Lunch", calories: 600, status: "completed" },
      {
        time: "4:00 PM",
        meal: "Afternoon Snack",
        calories: 250,
        status: "pending",
      },
      { time: "7:00 PM", meal: "Dinner", calories: 550, status: "pending" },
      {
        time: "9:00 PM",
        meal: "Evening Snack",
        calories: 150,
        status: "pending",
      },
    ],
  },
  workoutPlan: {
    currentProgram: "Strength & Conditioning",
    weeklyGoal: 4,
    completedThisWeek: 3,
    currentWorkouts: [
      {
        day: "Monday",
        focus: "Chest & Triceps",
        duration: 60,
        status: "completed",
      },
      {
        day: "Tuesday",
        focus: "Back & Biceps",
        duration: 55,
        status: "completed",
      },
      { day: "Wednesday", focus: "Rest Day", duration: 0, status: "rest" },
      {
        day: "Thursday",
        focus: "Legs & Glutes",
        duration: 65,
        status: "completed",
      },
      {
        day: "Friday",
        focus: "Shoulders & Core",
        duration: 50,
        status: "pending",
      },
      {
        day: "Saturday",
        focus: "Cardio & Flexibility",
        duration: 45,
        status: "pending",
      },
      { day: "Sunday", focus: "Rest Day", duration: 0, status: "rest" },
    ],
    recentSessions: [
      {
        date: "2024-12-10",
        workout: "Chest & Triceps",
        duration: 62,
        exercises: 8,
      },
      {
        date: "2024-12-08",
        workout: "Back & Biceps",
        duration: 58,
        exercises: 7,
      },
      {
        date: "2024-12-06",
        workout: "Legs & Glutes",
        duration: 68,
        exercises: 9,
      },
    ],
  },
  trainerNotes: [
    {
      date: "2024-12-10",
      trainer: "Mike Johnson",
      note: "Great progress on bench press! Increased weight by 10lbs. Focus on form for next session.",
      type: "progress",
    },
    {
      date: "2024-12-08",
      trainer: "Mike Johnson",
      note: "Member mentioned lower back discomfort. Adjusted deadlift form and reduced weight temporarily.",
      type: "concern",
    },
    {
      date: "2024-12-06",
      trainer: "Mike Johnson",
      note: "Excellent adherence to nutrition plan. Weight loss goals on track.",
      type: "nutrition",
    },
  ],
};

// type MemberDetailPageProps = {
//   params: {
//     id: string;
//   };
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MemberDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [newNote, setNewNote] = useState("");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "paid":
      case "completed":
        return "bg-emerald-100 text-emerald-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "rest":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/members">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Members
              </Button>
            </Link>
            <div className="flex items-center gap-4 flex-1">
              <Avatar className="h-16 w-16">
                <AvatarImage src={memberData.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {memberData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {memberData.name}
                </h1>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Mail className="h-3 w-3" />
                    {memberData.email}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Phone className="h-3 w-3" />
                    {memberData.phone}
                  </div>
                </div>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit Member
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="notes">Trainer Notes</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Subscription Info */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Subscription Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-600">
                          Plan Type
                        </label>
                        <div className="mt-1">
                          <Badge className="bg-purple-100 text-purple-700">
                            {memberData.subscription.type}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">
                          Status
                        </label>
                        <div className="mt-1">
                          <Badge
                            className={getStatusColor(
                              memberData.subscription.status
                            )}
                          >
                            {memberData.subscription.status}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">
                          Start Date
                        </label>
                        <p className="text-sm text-slate-900 mt-1">
                          {new Date(
                            memberData.subscription.startDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">
                          End Date
                        </label>
                        <p className="text-sm text-slate-900 mt-1">
                          {new Date(
                            memberData.subscription.endDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">
                          Monthly Fee
                        </label>
                        <p className="text-sm text-slate-900 mt-1">
                          ${memberData.subscription.monthlyFee}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">
                          Next Payment
                        </label>
                        <p className="text-sm text-slate-900 mt-1">
                          {new Date(
                            memberData.subscription.nextPayment
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Progress Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">
                        {memberData.stats.workoutsSessions}
                      </div>
                      <div className="text-sm text-slate-600">
                        Total Sessions
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        {memberData.stats.progressScore}%
                      </div>
                      <div className="text-sm text-slate-600">
                        Progress Score
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div>
                        <div className="text-lg font-bold text-red-600">
                          -{memberData.stats.weightLoss}lbs
                        </div>
                        <div className="text-xs text-slate-600">
                          Weight Loss
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">
                          +{memberData.stats.muscleGain}lbs
                        </div>
                        <div className="text-xs text-slate-600">
                          Muscle Gain
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Trainer Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Trainer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={memberData.trainer.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {memberData.trainer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-900">
                        {memberData.trainer.name}
                      </p>
                      <div className="flex gap-2 mt-1">
                        {memberData.trainer.specialties.map(
                          (specialty, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {specialty}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Nutrition Tab */}
            <TabsContent value="nutrition" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Apple className="h-5 w-5" />
                      Daily Meal Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {memberData.nutritionPlan.meals.map((meal, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                meal.status === "completed"
                                  ? "bg-emerald-500"
                                  : meal.status === "pending"
                                  ? "bg-amber-500"
                                  : "bg-slate-300"
                              }`}
                            />
                            <div>
                              <p className="font-medium text-slate-900">
                                {meal.meal}
                              </p>
                              <p className="text-sm text-slate-600">
                                {meal.time}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-slate-900">
                              {meal.calories} cal
                            </p>
                            <Badge
                              className={getStatusColor(meal.status)}
                              variant="secondary"
                            >
                              {meal.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Nutrition Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        Current Plan
                      </p>
                      <p className="text-sm text-slate-900 mt-1">
                        {memberData.nutritionPlan.currentPlan}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        Daily Targets
                      </p>
                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between text-sm">
                          <span>Calories</span>
                          <span className="font-medium">
                            {memberData.nutritionPlan.calories}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Protein</span>
                          <span className="font-medium">
                            {memberData.nutritionPlan.protein}g
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Carbs</span>
                          <span className="font-medium">
                            {memberData.nutritionPlan.carbs}g
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Fat</span>
                          <span className="font-medium">
                            {memberData.nutritionPlan.fat}g
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-2">
                        Adherence Rate
                      </p>
                      <Progress
                        value={memberData.nutritionPlan.adherence}
                        className="h-2"
                      />
                      <p className="text-sm text-slate-600 mt-1">
                        {memberData.nutritionPlan.adherence}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Workouts Tab */}
            <TabsContent value="workouts" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Dumbbell className="h-5 w-5" />
                      Weekly Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {memberData.workoutPlan.currentWorkouts.map(
                        (workout, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  workout.status === "completed"
                                    ? "bg-emerald-500"
                                    : workout.status === "pending"
                                    ? "bg-amber-500"
                                    : "bg-blue-500"
                                }`}
                              />
                              <div>
                                <p className="font-medium text-slate-900">
                                  {workout.day}
                                </p>
                                <p className="text-sm text-slate-600">
                                  {workout.focus}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              {workout.duration > 0 && (
                                <p className="text-sm font-medium text-slate-900">
                                  {workout.duration} min
                                </p>
                              )}
                              <Badge
                                className={getStatusColor(workout.status)}
                                variant="secondary"
                              >
                                {workout.status}
                              </Badge>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {memberData.workoutPlan.recentSessions.map(
                        (session, index) => (
                          <div
                            key={index}
                            className="p-3 bg-slate-50 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-slate-900">
                                {session.workout}
                              </p>
                              <p className="text-sm text-slate-600">
                                {new Date(session.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {session.duration} min
                              </div>
                              <div className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                {session.exercises} exercises
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Program Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Current Program</p>
                      <p className="font-medium text-slate-900">
                        {memberData.workoutPlan.currentProgram}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Weekly Goal</p>
                      <p className="font-medium text-slate-900">
                        {memberData.workoutPlan.weeklyGoal} sessions
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">This Week</p>
                      <p className="font-medium text-slate-900">
                        {memberData.workoutPlan.completedThisWeek}/
                        {memberData.workoutPlan.weeklyGoal} completed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Trainer Notes Tab */}
            <TabsContent value="notes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Add New Note
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Add a note about this member's progress, concerns, or achievements..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={3}
                    />
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Add Note
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Communication History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {memberData.trainerNotes.map((note, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/trainer-profile.png" />
                              <AvatarFallback>
                                {note.trainer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-slate-900">
                              {note.trainer}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className={
                                note.type === "progress"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : note.type === "concern"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-blue-100 text-blue-700"
                              }
                            >
                              {note.type}
                            </Badge>
                            <span className="text-sm text-slate-600">
                              {new Date(note.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

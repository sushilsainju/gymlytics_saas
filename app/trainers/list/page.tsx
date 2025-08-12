"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Users,
  LayoutGrid,
  List,
  Star,
  Clock,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";

// Mock data for trainers (same as card view)
const trainers = [
  {
    id: 1,
    name: "Mike Johnson",
    email: "mike.johnson@gymflow.com",
    phone: "+1 (555) 987-6543",
    avatar: "/trainer-profile.png",
    specialties: ["Strength Training", "Weight Loss", "Powerlifting"],
    availability: "Available",
    rating: 4.9,
    experience: "8 years",
    certifications: ["NASM-CPT", "CSCS"],
    assignedMembers: 24,
    memberNames: ["John Doe", "Alex Thompson", "Lisa Rodriguez", "Emma Wilson"],
    schedule: {
      monday: "6:00 AM - 8:00 PM",
      tuesday: "6:00 AM - 8:00 PM",
      wednesday: "6:00 AM - 2:00 PM",
      thursday: "6:00 AM - 8:00 PM",
      friday: "6:00 AM - 6:00 PM",
      saturday: "8:00 AM - 4:00 PM",
      sunday: "Off",
    },
    todaySessions: 8,
    weeklyHours: 45,
  },
  {
    id: 2,
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@gymflow.com",
    phone: "+1 (555) 876-5432",
    avatar: "/female-member-profile.png",
    specialties: ["Yoga", "Pilates", "Flexibility", "Rehabilitation"],
    availability: "Busy",
    rating: 4.8,
    experience: "6 years",
    certifications: ["RYT-500", "PMA-CPT"],
    assignedMembers: 18,
    memberNames: ["Sarah Miller", "David Chen", "Maria Garcia", "Tom Wilson"],
    schedule: {
      monday: "7:00 AM - 7:00 PM",
      tuesday: "7:00 AM - 7:00 PM",
      wednesday: "7:00 AM - 7:00 PM",
      thursday: "7:00 AM - 7:00 PM",
      friday: "7:00 AM - 5:00 PM",
      saturday: "9:00 AM - 3:00 PM",
      sunday: "Off",
    },
    todaySessions: 6,
    weeklyHours: 42,
  },
  {
    id: 3,
    name: "David Chen",
    email: "david.chen@gymflow.com",
    phone: "+1 (555) 765-4321",
    avatar: "/gym-owner-profile.png",
    specialties: ["CrossFit", "HIIT", "Athletic Performance"],
    availability: "Available",
    rating: 4.7,
    experience: "5 years",
    certifications: ["CF-L2", "ACSM-CPT"],
    assignedMembers: 16,
    memberNames: [
      "Michael Brown",
      "Jennifer Lee",
      "Robert Taylor",
      "Amanda Davis",
    ],
    schedule: {
      monday: "5:00 AM - 1:00 PM",
      tuesday: "5:00 AM - 1:00 PM",
      wednesday: "5:00 AM - 1:00 PM",
      thursday: "5:00 AM - 1:00 PM",
      friday: "5:00 AM - 1:00 PM",
      saturday: "7:00 AM - 12:00 PM",
      sunday: "Off",
    },
    todaySessions: 5,
    weeklyHours: 38,
  },
  {
    id: 4,
    name: "Sarah Thompson",
    email: "sarah.thompson@gymflow.com",
    phone: "+1 (555) 654-3210",
    avatar: "/community-member.png",
    specialties: [
      "Nutrition Coaching",
      "Weight Management",
      "Lifestyle Coaching",
    ],
    availability: "Off Today",
    rating: 4.9,
    experience: "7 years",
    certifications: ["NASM-CNC", "Precision Nutrition L1"],
    assignedMembers: 22,
    memberNames: [
      "Kevin Martinez",
      "Rachel Green",
      "Daniel Kim",
      "Sophie Anderson",
    ],
    schedule: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "Off",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Off",
    },
    todaySessions: 0,
    weeklyHours: 40,
  },
];

export default function TrainersListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesAvailability =
      availabilityFilter === "all" ||
      trainer.availability.toLowerCase() === availabilityFilter.toLowerCase();
    const matchesSpecialty =
      specialtyFilter === "all" ||
      trainer.specialties.some((specialty) =>
        specialty.toLowerCase().includes(specialtyFilter.toLowerCase())
      );

    return matchesSearch && matchesAvailability && matchesSpecialty;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case "available":
        return "bg-emerald-100 text-emerald-700";
      case "busy":
        return "bg-amber-100 text-amber-700";
      case "off today":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors = [
      "bg-blue-100 text-blue-700",
      "bg-purple-100 text-purple-700",
      "bg-emerald-100 text-emerald-700",
      "bg-amber-100 text-amber-700",
      "bg-pink-100 text-pink-700",
    ];
    return colors[specialty.length % colors.length];
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Trainers</h1>
              <p className="text-slate-600">
                Manage your gym trainers and their schedules
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <Link href="/trainers">
                  <Button variant="ghost" size="sm" className="h-8 px-3">
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 bg-white shadow-sm"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Trainer
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
                placeholder="Search trainers by name, email, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={availabilityFilter}
                onValueChange={setAvailabilityFilter}
              >
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="off today">Off Today</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={specialtyFilter}
                onValueChange={setSpecialtyFilter}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="strength">Strength Training</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="crossfit">CrossFit</SelectItem>
                  <SelectItem value="nutrition">Nutrition</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Trainers Table */}
        <main className="flex-1 p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing {filteredTrainers.length} of {trainers.length} trainers
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-900">
                    Trainer
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900">
                    Contact
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900">
                    Specialties
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900">
                    Experience
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900">
                    Members
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900">
                    Today
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900">
                    Weekly Hours
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900">
                    Rating
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrainers.map((trainer) => (
                  <TableRow
                    key={trainer.id}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={trainer.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {trainer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-slate-900">
                            {trainer.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {trainer.certifications.join(", ")}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Mail className="h-3 w-3" />
                          <span className="truncate max-w-[150px]">
                            {trainer.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Phone className="h-3 w-3" />
                          <span>{trainer.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getAvailabilityColor(trainer.availability)}
                      >
                        {trainer.availability}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {trainer.specialties
                          .slice(0, 2)
                          .map((specialty, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className={`${getSpecialtyColor(
                                specialty
                              )} text-xs`}
                            >
                              {specialty}
                            </Badge>
                          ))}
                        {trainer.specialties.length > 2 && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-slate-100 text-slate-600"
                          >
                            +{trainer.specialties.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-slate-900">
                        {trainer.experience}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="font-medium text-slate-900">
                          {trainer.assignedMembers}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="font-medium text-slate-900">
                          {trainer.todaySessions}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-slate-900">
                        {trainer.weeklyHours}h
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-500 fill-current" />
                        <span className="font-medium text-slate-900">
                          {trainer.rating}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTrainers.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
              <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No trainers found
              </h3>
              <p className="text-slate-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  Filter,
  Plus,
  CreditCard,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar";

interface Subscription {
  id: number;
  memberName: string;
  memberAvatar: string;
  memberEmail: string;
  planType: string;
  status: string;
  startDate: string;
  endDate: string;
  monthlyFee: number;
  paymentStatus: string;
  lastPayment: string | null;
  nextPayment: string | null;
  paymentMethod: string;
  totalPaid: number;
  daysUntilExpiry: number;
}

// Mock data for subscriptions
const subscriptions = [
  {
    id: 1,
    memberName: "John Doe",
    memberAvatar: "/member-profile.png",
    memberEmail: "john.doe@email.com",
    planType: "Premium",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2025-03-15",
    monthlyFee: 89.99,
    paymentStatus: "Paid",
    lastPayment: "2024-12-01",
    nextPayment: "2025-01-01",
    paymentMethod: "Credit Card",
    totalPaid: 1079.88,
    daysUntilExpiry: 95,
  },
  {
    id: 2,
    memberName: "Sarah Miller",
    memberAvatar: "/female-member-profile.png",
    memberEmail: "sarah.miller@email.com",
    planType: "Standard",
    status: "Active",
    startDate: "2024-02-10",
    endDate: "2025-02-20",
    monthlyFee: 59.99,
    paymentStatus: "Paid",
    lastPayment: "2024-12-01",
    nextPayment: "2025-01-01",
    paymentMethod: "Bank Transfer",
    totalPaid: 659.89,
    daysUntilExpiry: 71,
  },
  {
    id: 3,
    memberName: "Alex Thompson",
    memberAvatar: "/community-member.png",
    memberEmail: "alex.thompson@email.com",
    planType: "Premium",
    status: "Expiring",
    startDate: "2023-12-01",
    endDate: "2024-12-15",
    monthlyFee: 89.99,
    paymentStatus: "Overdue",
    lastPayment: "2024-11-01",
    nextPayment: "2024-12-01",
    paymentMethod: "Credit Card",
    totalPaid: 1169.87,
    daysUntilExpiry: 4,
  },
  {
    id: 4,
    memberName: "Emma Wilson",
    memberAvatar: "/trainer-profile.png",
    memberEmail: "emma.wilson@email.com",
    planType: "Basic",
    status: "Expiring",
    startDate: "2024-03-20",
    endDate: "2024-12-16",
    monthlyFee: 39.99,
    paymentStatus: "Overdue",
    lastPayment: "2024-11-01",
    nextPayment: "2024-12-01",
    paymentMethod: "Credit Card",
    totalPaid: 359.91,
    daysUntilExpiry: 5,
  },
  {
    id: 5,
    memberName: "David Chen",
    memberAvatar: "/gym-owner-profile.png",
    memberEmail: "david.chen@email.com",
    planType: "Standard",
    status: "Cancelled",
    startDate: "2024-04-05",
    endDate: "2024-11-30",
    monthlyFee: 59.99,
    paymentStatus: "Refunded",
    lastPayment: "2024-10-01",
    nextPayment: null,
    paymentMethod: "Credit Card",
    totalPaid: 479.92,
    daysUntilExpiry: -11,
  },
  {
    id: 6,
    memberName: "Lisa Rodriguez",
    memberAvatar: "/female-member-profile.png",
    memberEmail: "lisa.rodriguez@email.com",
    planType: "Premium",
    status: "Active",
    startDate: "2024-05-12",
    endDate: "2025-04-10",
    monthlyFee: 89.99,
    paymentStatus: "Paid",
    lastPayment: "2024-12-01",
    nextPayment: "2025-01-01",
    paymentMethod: "Bank Transfer",
    totalPaid: 629.93,
    daysUntilExpiry: 120,
  },
];

const planTypes = [
  { name: "Basic", price: 39.99, features: ["Gym Access", "Basic Equipment"] },
  {
    name: "Standard",
    price: 59.99,
    features: ["Gym Access", "All Equipment", "Group Classes"],
  },
  {
    name: "Premium",
    price: 89.99,
    features: [
      "Gym Access",
      "All Equipment",
      "Group Classes",
      "Personal Training",
      "Nutrition Coaching",
    ],
  },
];

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [isRenewDialogOpen, setIsRenewDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch =
      subscription.memberName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      subscription.memberEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      subscription.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPlan =
      planFilter === "all" ||
      subscription.planType.toLowerCase() === planFilter.toLowerCase();
    const matchesPayment =
      paymentFilter === "all" ||
      subscription.paymentStatus.toLowerCase() === paymentFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPlan && matchesPayment;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-100 text-emerald-700";
      case "expiring":
        return "bg-amber-100 text-amber-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-emerald-100 text-emerald-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      case "refunded":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case "premium":
        return "bg-purple-100 text-purple-700";
      case "standard":
        return "bg-blue-100 text-blue-700";
      case "basic":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const handleRenewSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsRenewDialogOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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
                Subscriptions
              </h1>
              <p className="text-slate-600">
                Manage member subscriptions and payment tracking
              </p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              New Subscription
            </Button>
          </div>
        </header>

        {/* Summary Stats */}
        <div className="p-6 bg-white border-b border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {subscriptions.filter((s) => s.status === "Active").length}
              </div>
              <div className="text-sm text-slate-600">Active Subscriptions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {subscriptions.filter((s) => s.status === "Expiring").length}
              </div>
              <div className="text-sm text-slate-600">Expiring Soon</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {
                  subscriptions.filter((s) => s.paymentStatus === "Overdue")
                    .length
                }
              </div>
              <div className="text-sm text-slate-600">Overdue Payments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">
                {formatCurrency(
                  subscriptions.reduce((sum, s) => sum + s.totalPaid, 0)
                )}
              </div>
              <div className="text-sm text-slate-600">Total Revenue</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 bg-white border-b border-slate-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by member name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expiring">Expiring</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Subscriptions List */}
        <main className="flex-1 p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing {filteredSubscriptions.length} of {subscriptions.length}{" "}
              subscriptions
            </p>
          </div>

          <div className="space-y-4">
            {filteredSubscriptions.map((subscription) => (
              <Card
                key={subscription.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={subscription.memberAvatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {subscription.memberName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {subscription.memberName}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {subscription.memberEmail}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className={getStatusColor(subscription.status)}
                          >
                            {subscription.status}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={getPlanColor(subscription.planType)}
                          >
                            {subscription.planType}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={getPaymentStatusColor(
                              subscription.paymentStatus
                            )}
                          >
                            {subscription.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">
                        {formatCurrency(subscription.monthlyFee)}/month
                      </div>
                      <div className="text-sm text-slate-600">
                        Total: {formatCurrency(subscription.totalPaid)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        Start Date
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {new Date(subscription.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        End Date
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {new Date(subscription.endDate).toLocaleDateString()}
                      </p>
                      {subscription.daysUntilExpiry > 0 &&
                        subscription.daysUntilExpiry <= 30 && (
                          <p className="text-xs text-amber-600 flex items-center gap-1 mt-1">
                            <AlertTriangle className="h-3 w-3" />
                            {subscription.daysUntilExpiry} days left
                          </p>
                        )}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        Last Payment
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {subscription.lastPayment
                          ? new Date(
                              subscription.lastPayment
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        Next Payment
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {subscription.nextPayment
                          ? new Date(
                              subscription.nextPayment
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
                    {subscription.status === "Expiring" && (
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleRenewSubscription(subscription)}
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Renew
                      </Button>
                    )}
                    {subscription.paymentStatus === "Overdue" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      >
                        <CreditCard className="h-3 w-3 mr-1" />
                        Collect Payment
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSubscriptions.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No subscriptions found
              </h3>
              <p className="text-slate-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Renew Subscription Dialog */}
      <Dialog open={isRenewDialogOpen} onOpenChange={setIsRenewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Renew Subscription</DialogTitle>
          </DialogHeader>
          {selectedSubscription && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={
                      selectedSubscription.memberAvatar || "/placeholder.svg"
                    }
                  />
                  <AvatarFallback>
                    {selectedSubscription.memberName
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {selectedSubscription.memberName}
                  </p>
                  <p className="text-sm text-slate-600">
                    {selectedSubscription.planType} Plan
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="plan-select">Select Plan</Label>
                  <Select
                    defaultValue={selectedSubscription.planType.toLowerCase()}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {planTypes.map((plan) => (
                        <SelectItem
                          key={plan.name.toLowerCase()}
                          value={plan.name.toLowerCase()}
                        >
                          {plan.name} - {formatCurrency(plan.price)}/month
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select defaultValue="12">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Month</SelectItem>
                      <SelectItem value="3">3 Months</SelectItem>
                      <SelectItem value="6">6 Months</SelectItem>
                      <SelectItem value="12">12 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  Renew Subscription
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsRenewDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

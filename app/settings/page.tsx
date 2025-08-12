"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  User,
  Bell,
  Settings,
  Shield,
  CreditCard,
  Save,
  Upload,
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Smartphone,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("gym-profile");
  const [gymProfile, setGymProfile] = useState({
    name: "FitLife Gym",
    description:
      "Premium fitness center with state-of-the-art equipment and expert trainers",
    address: "123 Fitness Street, Health City, HC 12345",
    phone: "+1 (555) 123-4567",
    email: "info@fitlifegym.com",
    website: "www.fitlifegym.com",
    hours: "Mon-Fri: 5:00 AM - 11:00 PM, Sat-Sun: 6:00 AM - 10:00 PM",
  });

  const [userProfile, setUserProfile] = useState({
    name: "John Anderson",
    email: "john@fitlifegym.com",
    role: "Gym Owner",
    phone: "+1 (555) 987-6543",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    membershipExpiry: true,
    paymentReminders: true,
    newRegistrations: true,
    trainerUpdates: false,
  });

  const [systemSettings, setSystemSettings] = useState({
    timezone: "America/New_York",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    language: "English",
    autoBackup: true,
    maintenanceMode: false,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your gym profile and system preferences
              </p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger
                  value="gym-profile"
                  className="flex items-center gap-2"
                >
                  <Building2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Gym Profile</span>
                </TabsTrigger>
                <TabsTrigger
                  value="user-account"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex items-center gap-2"
                >
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">System</span>
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">Billing</span>
                </TabsTrigger>
              </TabsList>

              {/* Gym Profile Tab */}
              <TabsContent value="gym-profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Gym Information
                    </CardTitle>
                    <CardDescription>
                      Update your gym&apos;s basic information and contact
                      details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gym-name">Gym Name</Label>
                        <Input
                          id="gym-name"
                          value={gymProfile.name}
                          onChange={(e) =>
                            setGymProfile({
                              ...gymProfile,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gym-website">Website</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="gym-website"
                            value={gymProfile.website}
                            onChange={(e) =>
                              setGymProfile({
                                ...gymProfile,
                                website: e.target.value,
                              })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gym-description">Description</Label>
                      <Textarea
                        id="gym-description"
                        value={gymProfile.description}
                        onChange={(e) =>
                          setGymProfile({
                            ...gymProfile,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gym-address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                        <Textarea
                          id="gym-address"
                          value={gymProfile.address}
                          onChange={(e) =>
                            setGymProfile({
                              ...gymProfile,
                              address: e.target.value,
                            })
                          }
                          className="pl-10"
                          rows={2}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gym-phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="gym-phone"
                            value={gymProfile.phone}
                            onChange={(e) =>
                              setGymProfile({
                                ...gymProfile,
                                phone: e.target.value,
                              })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gym-email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="gym-email"
                            value={gymProfile.email}
                            onChange={(e) =>
                              setGymProfile({
                                ...gymProfile,
                                email: e.target.value,
                              })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gym-hours">Operating Hours</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                        <Textarea
                          id="gym-hours"
                          value={gymProfile.hours}
                          onChange={(e) =>
                            setGymProfile({
                              ...gymProfile,
                              hours: e.target.value,
                            })
                          }
                          className="pl-10"
                          rows={2}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Gym Logo</CardTitle>
                    <CardDescription>
                      Upload your gym&apos;s logo for branding
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </Button>
                        <p className="text-sm text-gray-500 mt-1">
                          PNG, JPG up to 2MB
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* User Account Tab */}
              <TabsContent value="user-account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Manage your personal account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Change Photo
                        </Button>
                        <p className="text-sm text-gray-500 mt-1">
                          PNG, JPG up to 1MB
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="user-name">Full Name</Label>
                        <Input
                          id="user-name"
                          value={userProfile.name}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-role">Role</Label>
                        <Input
                          id="user-role"
                          value={userProfile.role}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="user-email">Email Address</Label>
                        <Input
                          id="user-email"
                          value={userProfile.email}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-phone">Phone Number</Label>
                        <Input
                          id="user-phone"
                          value={userProfile.phone}
                          onChange={(e) =>
                            setUserProfile({
                              ...userProfile,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your account password
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm Password
                        </Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button variant="outline">Update Password</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose how you want to receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Notification Channels</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-gray-500">
                              Receive notifications via email
                            </p>
                          </div>
                          <Switch
                            checked={notifications.emailNotifications}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                emailNotifications: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>SMS Notifications</Label>
                            <p className="text-sm text-gray-500">
                              Receive notifications via text message
                            </p>
                          </div>
                          <Switch
                            checked={notifications.smsNotifications}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                smsNotifications: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Push Notifications</Label>
                            <p className="text-sm text-gray-500">
                              Receive browser push notifications
                            </p>
                          </div>
                          <Switch
                            checked={notifications.pushNotifications}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                pushNotifications: checked,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-medium">Notification Types</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Membership Expiry</Label>
                            <p className="text-sm text-gray-500">
                              Alerts when memberships are about to expire
                            </p>
                          </div>
                          <Switch
                            checked={notifications.membershipExpiry}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                membershipExpiry: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Payment Reminders</Label>
                            <p className="text-sm text-gray-500">
                              Notifications for overdue payments
                            </p>
                          </div>
                          <Switch
                            checked={notifications.paymentReminders}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                paymentReminders: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>New Registrations</Label>
                            <p className="text-sm text-gray-500">
                              Alerts for new member registrations
                            </p>
                          </div>
                          <Switch
                            checked={notifications.newRegistrations}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                newRegistrations: checked,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Trainer Updates</Label>
                            <p className="text-sm text-gray-500">
                              Notifications from trainer activities
                            </p>
                          </div>
                          <Switch
                            checked={notifications.trainerUpdates}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                trainerUpdates: checked,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* System Tab */}
              <TabsContent value="system" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      System Configuration
                    </CardTitle>
                    <CardDescription>
                      Configure system-wide settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          value={systemSettings.timezone}
                          onValueChange={(value) =>
                            setSystemSettings({
                              ...systemSettings,
                              timezone: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">
                              Eastern Time (ET)
                            </SelectItem>
                            <SelectItem value="America/Chicago">
                              Central Time (CT)
                            </SelectItem>
                            <SelectItem value="America/Denver">
                              Mountain Time (MT)
                            </SelectItem>
                            <SelectItem value="America/Los_Angeles">
                              Pacific Time (PT)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select
                          value={systemSettings.currency}
                          onValueChange={(value) =>
                            setSystemSettings({
                              ...systemSettings,
                              currency: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                            <SelectItem value="CAD">CAD (C$)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date-format">Date Format</Label>
                        <Select
                          value={systemSettings.dateFormat}
                          onValueChange={(value) =>
                            setSystemSettings({
                              ...systemSettings,
                              dateFormat: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MM/DD/YYYY">
                              MM/DD/YYYY
                            </SelectItem>
                            <SelectItem value="DD/MM/YYYY">
                              DD/MM/YYYY
                            </SelectItem>
                            <SelectItem value="YYYY-MM-DD">
                              YYYY-MM-DD
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={systemSettings.language}
                          onValueChange={(value) =>
                            setSystemSettings({
                              ...systemSettings,
                              language: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                            <SelectItem value="German">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Automatic Backup</Label>
                          <p className="text-sm text-gray-500">
                            Automatically backup data daily
                          </p>
                        </div>
                        <Switch
                          checked={systemSettings.autoBackup}
                          onCheckedChange={(checked) =>
                            setSystemSettings({
                              ...systemSettings,
                              autoBackup: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Maintenance Mode</Label>
                          <p className="text-sm text-gray-500">
                            Enable maintenance mode for system updates
                          </p>
                        </div>
                        <Switch
                          checked={systemSettings.maintenanceMode}
                          onCheckedChange={(checked) =>
                            setSystemSettings({
                              ...systemSettings,
                              maintenanceMode: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage security and access control settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-500">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {security.twoFactorAuth && (
                            <Badge variant="secondary">Enabled</Badge>
                          )}
                          <Switch
                            checked={security.twoFactorAuth}
                            onCheckedChange={(checked) =>
                              setSecurity({
                                ...security,
                                twoFactorAuth: checked,
                              })
                            }
                          />
                        </div>
                      </div>
                      {security.twoFactorAuth && (
                        <div className="ml-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Smartphone className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">
                              2FA is enabled
                            </span>
                          </div>
                          <p className="text-sm text-green-700">
                            Your account is protected with two-factor
                            authentication.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 bg-transparent"
                          >
                            Manage 2FA
                          </Button>
                        </div>
                      )}
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="session-timeout">
                          Session Timeout (minutes)
                        </Label>
                        <Select
                          value={security.sessionTimeout}
                          onValueChange={(value) =>
                            setSecurity({ ...security, sessionTimeout: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-expiry">
                          Password Expiry (days)
                        </Label>
                        <Select
                          value={security.passwordExpiry}
                          onValueChange={(value) =>
                            setSecurity({ ...security, passwordExpiry: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-attempts">
                        Maximum Login Attempts
                      </Label>
                      <Select
                        value={security.loginAttempts}
                        onValueChange={(value) =>
                          setSecurity({ ...security, loginAttempts: value })
                        }
                      >
                        <SelectTrigger className="w-full md:w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 attempts</SelectItem>
                          <SelectItem value="5">5 attempts</SelectItem>
                          <SelectItem value="10">10 attempts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing Tab */}
              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Subscription & Billing
                    </CardTitle>
                    <CardDescription>
                      Manage your GymFlow subscription and billing information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-emerald-900">
                          Professional Plan
                        </h4>
                        <Badge className="bg-emerald-600">Active</Badge>
                      </div>
                      <p className="text-sm text-emerald-700 mb-3">
                        Full access to all features including unlimited members,
                        trainers, and advanced analytics.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-emerald-900">
                          $99/month
                        </span>
                        <Button variant="outline" size="sm">
                          Change Plan
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-medium">Payment Method</h4>
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/25</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-medium">Billing History</h4>
                      <div className="space-y-2">
                        {[
                          {
                            date: "Dec 1, 2024",
                            amount: "$99.00",
                            status: "Paid",
                          },
                          {
                            date: "Nov 1, 2024",
                            amount: "$99.00",
                            status: "Paid",
                          },
                          {
                            date: "Oct 1, 2024",
                            amount: "$99.00",
                            status: "Paid",
                          },
                        ].map((invoice, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{invoice.date}</p>
                              <p className="text-sm text-gray-500">
                                Professional Plan
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{invoice.amount}</p>
                              <Badge variant="secondary" className="text-xs">
                                {invoice.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

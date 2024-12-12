import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { Label } from '@radix-ui/react-label'
import { Bell, PenSquare, LogOut, Lock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import React from 'react'

const page = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle className="text-2xl font-bold">John Doe</CardTitle>
                    <CardDescription>john.doe@example.com</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Personal Information</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" defaultValue="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Bell className="w-4 h-4" />
                                        <Label htmlFor="notifications">Notifications</Label>
                                    </div>
                                    <Switch id="notifications" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Lock className="w-4 h-4" />
                                        <Label htmlFor="privacy">Privacy Mode</Label>
                                    </div>
                                    <Switch id="privacy" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Button className="w-full">
                                <PenSquare className="w-4 h-4 mr-2" />
                                Update Profile
                            </Button>
                            <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default page
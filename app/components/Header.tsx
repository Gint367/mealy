"use client"
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from './ModeToggle';



export default function Header() {
    const { status, data: session } = useSession();
    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-8">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">M</span>
                </div>

                <nav className="flex space-x-6">
                    <Link href="/recipes" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                        Recipes
                    </Link>
                    <Link href="/" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                        Calendar
                    </Link>
                    <Link href="/shopping-list" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                        Shopping List
                    </Link>
                </nav>
            </div>
            <div className='flex items-center space-x-4'>
                <ModeToggle />
                {
                    status === "authenticated" && (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={session?.user?.image || ""} />
                                    <AvatarFallback>Me</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    {session?.user?.email || ""}
                                </DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Link className='block w-full' href="/profilepage">View Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link className='block w-full' href="/api/auth/signout">Log Out</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
                {
                    status === "unauthenticated" && (
                        <Link href="/api/auth/signin" >Log In</Link>
                    )
                }
            </div>
        </nav>
    );
}
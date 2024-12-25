"use client";
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
import { Loader2 } from 'lucide-react';
import Image from 'next/image';


export default function Header() {
    const { status, data: session } = useSession();
    return (
        <div className="flex items-center justify-between px-6 py-4 border-b bg-background h-16">
            <div className="flex items-center space-x-8">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Link href="/" className="text-lg font-semibold text-foreground">
                        <Image src='/mealy.webp' alt="logo" className="w-full h-full object-cover" width={16} height={16} />
                    </Link>

                </div>

                <nav className="flex space-x-3">
                    <Link href="/" className="px-4 py-2 font-bold bg-accent hover:bg-accent rounded-xl text-foreground ">
                        Calendar
                    </Link>
                    <Link href="/recipes" className="px-4 py-2 font-bold bg-accent hover:bg-accent rounded-xl text-foreground">
                        Recipes
                    </Link>
                    <Link href="/shopping-list" className="px-4 py-2 font-bold bg-accent hover:bg-accent rounded-xl text-foreground">
                        Shopping List
                    </Link>
                </nav>
            </div>
            <div className='flex items-center space-x-4'>
                <ModeToggle />
                {
                    status === "loading" && (
                        <Loader2 className="animate-spin" /> // Show spinner when loading
                    )
                }
                {
                    status === "authenticated" && (
                        //console.log("authenticated"),
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={session?.user?.image || "P"} />
                                    <AvatarFallback>Me</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className="text-foreground">
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
        </div>
    );
}
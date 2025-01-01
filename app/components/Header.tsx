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
        <nav className="container mx-auto flex items-center justify-between px-4 py-2 border-b md:px-6 md:py-4">
            <div className="flex items-center space-x-4 md:space-x-8">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-muted flex items-center justify-center">
                    <Link href="/">
                        <Image src='/mealy.webp' alt="logo" className="w-full h-full object-cover" width={48} height={48} />
                    </Link>

                </div>

                <div className="flex space-x-2 md:space-x-3 text-sm md:text-base">
                    <Link href="/" className="px-2 py-1 md:px-4 md:py-2 font-bold bg-accent hover:bg-accent/50 rounded-xl max-h-8 md:max-h-10">
                        Calendar
                    </Link>
                    <Link href="/recipes" className="px-2 py-1 md:px-4 md:py-2 font-bold bg-accent hover:bg-accent/50 rounded-xl max-h-8 md:max-h-10">
                        Recipes
                    </Link>
                    <Link href="/shopping-list" className="px-2 py-1 md:px-4 md:py-2 font-bold bg-accent hover:bg-accent/50 rounded-xl max-h-8 md:max-h-10 text-nowrap">
                        Shopping List
                    </Link>
                </div>
            </div>
            <div className="flex items-center space-x-4 max-md:space-x-1 pl-1">
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
                                    <Link className='block w-full text-destructive' href="/api/auth/signout">Log Out</Link>
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
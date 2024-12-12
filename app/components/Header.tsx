"use client"
import Link from 'next/link';
import { useSession } from 'next-auth/react';


export default function Header() {
    const { status, data: session } = useSession();
    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-8">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-semibold">M</span>
                </div>

                <nav className="flex space-x-6">
                    <Link href="/recipes" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                        Recipes
                    </Link>
                    <Link href="/" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                        Calendar
                    </Link>
                    <Link href="/shopping-list" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                        Shopping List
                    </Link>
                </nav>
            </div>
            <div>
                {
                    status === "authenticated" && (
                        <Link href="/api/auth/signout" >Log Out</Link>
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
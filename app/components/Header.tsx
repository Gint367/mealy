import Link from 'next/link';

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
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

            <Link href="/profilepage" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span>P</span>
            </Link>
        </header>
    );
} 
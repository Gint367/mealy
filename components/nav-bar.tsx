import Link from 'next/link'
import { Utensils, HelpCircle } from 'lucide-react'

export function NavBar() {
  return (
    <nav className="border-b">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Utensils className="h-8 w-8" />
          </Link>
          
          <div className="flex items-center space-x-1">
            <Link 
              href="/recipes" 
              className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
            >
              Recipes
            </Link>
            <Link 
              href="/calendar" 
              className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
            >
              Calendar
            </Link>
            <Link 
              href="/shopping-list" 
              className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
            >
              Shopping List
            </Link>
          </div>
          
          <Link href="/help" className="flex items-center">
            <HelpCircle className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  )
}


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Navigation() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full border" />
              <span className="text-lg font-semibold">Logo</span>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost">Recipes</Button>
            <Button variant="ghost">Calendar</Button>
            <Button variant="ghost">Shopping List</Button>
          </nav>
          <Avatar>
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}


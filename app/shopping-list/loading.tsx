import { Skeleton } from '@/components/ui/skeleton'

export default function ShoppinglistSkeleton() {
    return (
        <div className="container mx-auto max-w-3xl">
            <div className="flex items-center justify-center gap-4 mb-6">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 w-8" />
            </div>

            <div className="grid grid-cols-7 gap-2 mb-8">
                {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                ))}
            </div>
        </div>
    )
}
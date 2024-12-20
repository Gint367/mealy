import { Skeleton } from "@/components/ui/skeleton";
import { Flex } from '@radix-ui/themes';

export function RecipeSkeleton() {
    return (
        <div>
            <Flex className="mb-2" justify={"between"}>
                <Skeleton className="h-8 w-32" />
            </Flex>
            <Skeleton className="mb-4 h-10 w-full border border-primary/50 bg-primary-foreground text-primary" />
            <div>
                <Skeleton className="h-10 w-full mb-2" />
                {Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton key={index} className="h-10 w-full mb-2" />
                ))}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                    </div>
                    <Skeleton className="h-6 w-24" />
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                </div>
            </div>
        </div>
    );
}

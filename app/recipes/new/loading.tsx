import { Skeleton } from "@/components/ui/skeleton";
import { Flex } from '@radix-ui/themes';

export default function Loading() {
    return (
        <Flex className="container mx-auto p-4" direction={"column"} gap={"4"} justify={'between'}>
            <Skeleton className="w-48 h-9 font-bold mb-9" />
            <Flex className="mb-4" justify={"between"}>
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
            </Flex>
            <Skeleton className="h-10 w-full mb-4" />
            <div className="mx-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-10 w-full mb-2" />
                ))}
            </div>
            <Skeleton className="h-5 w-26 mt-4" />
            <Skeleton className="h-5 w-24 mt-4" />
        </Flex>
    );
}
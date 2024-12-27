import { Skeleton } from "@/components/ui/skeleton";
import { Flex } from '@radix-ui/themes';

export default function Loading() {
    return (
        <Flex className="container mx-auto p-4" direction={"column"} gap={"4"} justify={'between'}>
            <Skeleton className="h-10 w-48 mb-4" />
            <Flex className="mb-4" justify={"between"}>
                <Skeleton className="h-8 w-32" />

            </Flex>
            <Skeleton className="h-10 w-full mb-4 border border-b" />
            <div className="px-6 py-2 space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-8 w-auto " />
                ))}
            </div>
        </Flex>
    );
}

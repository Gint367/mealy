"use client";

import { useState } from "react";

interface PortionSizeControlProps {
    initialSize: number;
}

export default function PortionSizeControl({ initialSize }: PortionSizeControlProps) {
    const [portionSize, setPortionSize] = useState(initialSize);

    const handleIncrease = () => setPortionSize((prev) => prev + 1);
    const handleDecrease = () => setPortionSize((prev) => Math.max(1, prev - 1));

    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={handleDecrease}
                className="px-4 py-2  rounded-full"
            >
                -
            </button>
            <span className="text-xl font-semibold">{portionSize}</span>
            <button
                onClick={handleIncrease}
                className="px-4 py-2  rounded-full"
            >
                +
            </button>
        </div>
    );
}
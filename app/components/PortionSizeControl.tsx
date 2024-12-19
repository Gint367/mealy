"use client";

import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface PortionSizeControlProps {
    initialSize: number;
    onChange: (newSize: number) => void;
}

export default function PortionSizeControl({ initialSize, onChange }: PortionSizeControlProps) {
    const [portionSize, setPortionSize] = useState<number>(initialSize);

    const handleIncrease = () => {
        const newSize = portionSize + 1;
        setPortionSize(newSize);
        onChange(newSize);
    };
    const handleDecrease = () => {
        const newSize = Math.max(1, portionSize - 1);
        setPortionSize(newSize);
        onChange(newSize);
    };

    return (
        <div className="flex items-center space-x-2">
            <Button
                onClick={handleDecrease}
                variant="outline"
                className="px-2 py-1"
            >
                -
            </Button>
            <span className="text-lg font-medium">{portionSize}</span>
            <Button
                onClick={handleIncrease}
                variant="outline"
                className="px-2 py-1"
            >
                +
            </Button>
        </div>
    );
}


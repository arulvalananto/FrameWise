import React, { memo } from 'react';

interface InsightSectionProps {
    title: string;
    count: number;
    children: React.ReactNode;
    className?: string;
}

const InsightSection: React.FC<InsightSectionProps> = ({
    title,
    count,
    children,
    className = '',
}) => {
    return (
        <div className={`rounded overflow-hidden ${className}`}>
            <div className="p-3 flex justify-between text-sm bg-secondary items-center">
                <div className="flex flex-row gap-2 items-center">
                    <h1 className="font-semibold capitalize text-gray-600">
                        {title}
                    </h1>
                    <p className="text-xs font-semibold text-gray-400">
                        ({count} items)
                    </p>
                </div>
            </div>
            <div className="p-3 flex flex-row flex-wrap gap-x-3 gap-y-2 bg-secondary">
                {children}
            </div>
        </div>
    );
};

const MemoziedInsightSection = memo(InsightSection);
export default MemoziedInsightSection;

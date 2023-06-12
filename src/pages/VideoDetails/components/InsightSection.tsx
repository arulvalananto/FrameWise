import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import constants from '../../../static/constants.json';

interface InsightSectionProps {
    title: string;
    count: number;
    children: React.ReactNode;
    className?: string;
    isExpanded?: boolean;
    showExpand?: boolean;
    handleIsExpanded?: () => void;
}

const InsightSection: React.FC<InsightSectionProps> = ({
    title,
    count,
    children,
    handleIsExpanded,
    isExpanded = false,
    showExpand = true,
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
                    {count > constants.EXPAND_MAX_LIMIT && showExpand && (
                        <button
                            type="button"
                            className="text-xs bg-black px-2 py-1 rounded"
                            onClick={handleIsExpanded}
                        >
                            {isExpanded ? (
                                <span className="flex items-center gap-1">
                                    <span>collapse</span>
                                    <FontAwesomeIcon icon={faAngleDown} />
                                </span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <span>expand</span>
                                    <FontAwesomeIcon icon={faAngleUp} />
                                </span>
                            )}
                        </button>
                    )}
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

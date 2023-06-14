import React from 'react';

import Tag from './Tag';

const Tags: React.FC<{ tags: string[] }> = ({ tags }) => {
    return (
        <div className="flex flex-row items-center gap-2 text-xs">
            {tags?.map((tag) => (
                <Tag tag={tag} key={tag} />
            ))}
        </div>
    );
};

const MemoizedTags = React.memo(Tags);
export default MemoizedTags;

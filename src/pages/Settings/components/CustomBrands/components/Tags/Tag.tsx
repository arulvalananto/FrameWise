import React from 'react';

const Tag: React.FC<{ tag: string }> = ({ tag }) => {
    return (
        <p
            key={tag}
            className="px-2 py-1 rounded-full bg-white text-black cursor-pointer"
        >
            {tag}
        </p>
    );
};

const MemoizedTag = React.memo(Tag);
export default MemoizedTag;

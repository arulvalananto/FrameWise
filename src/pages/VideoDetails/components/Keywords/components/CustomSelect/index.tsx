import React from 'react';

import './index.css';

type CustomSelectProps = {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: any[];
};

const CustomSelect: React.FC<CustomSelectProps> = ({
    value,
    onChange,
    options,
}) => {
    return (
        <select value={value} onChange={onChange} className="custom-select">
            {options?.map((option) => (
                <option key={option.id} value={option.text || option.type}>
                    {option.text || option.type} ({option.instances.length})
                </option>
            ))}
        </select>
    );
};

const MemoizedCustomSelect = React.memo(CustomSelect);
export default MemoizedCustomSelect;

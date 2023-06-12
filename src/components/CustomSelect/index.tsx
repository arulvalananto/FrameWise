import React from 'react';

type CustomSelectProps = {
    value: any;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: any[];
};

const CustomSelect: React.FC<CustomSelectProps> = ({
    value,
    onChange,
    options,
}) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className="bg-black text-white p-2 border-none outline-none rounded text-xs md:text-base"
        >
            {options?.map((option) => (
                <option key={option.id} value={option.text || option.type}>
                    {option.text || option.type} ({option.instances.length})
                </option>
            ))}
        </select>
    );
};

export default CustomSelect;

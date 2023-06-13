import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';

type SearchboxProps = {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: IconProp | IconDefinition;
    className?: string;
    inputClassName?: string;
    placeholder?: string;
};

const Searchbox: React.FC<SearchboxProps> = ({
    value,
    onChange,
    icon = faMagnifyingGlass,
    className = '',
    inputClassName = '',
    placeholder = 'Search something...',
    ...props
}) => {
    return (
        <div
            className={`bg-secondary flex flex-row gap-2 items-center px-4 py-2 rounded w-full md:w-1/2 lg:w-1/4 mt-2 md:mt-0  text-sm md:text-base ${className}`}
        >
            <FontAwesomeIcon icon={icon} />
            <input
                name="search"
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                aria-label="Search"
                className={`bg-transparent w-full border-none outline-none text-input ${inputClassName}`}
                {...props}
            />
        </div>
    );
};

export default Searchbox;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';

import './index.css';
import constants from '../../static/constants.json';

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
    placeholder = constants.SEARCH.DEFAULT,
    ...props
}) => {
    return (
        <div className={`searchbox ${className}`}>
            <FontAwesomeIcon icon={icon} />
            <input
                name="search"
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                aria-label="Search"
                className={`searchbox-inputbox ${inputClassName}`}
                {...props}
            />
        </div>
    );
};

const MemoziedSearchbox = React.memo(Searchbox);
export default MemoziedSearchbox;

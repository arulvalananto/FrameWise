import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CustomLinkProps } from '../../interfaces/common';

const CustomLink: React.FC<CustomLinkProps> = ({ link }) => {
    const { title, to, icon } = link;

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `w-10 md:w-full flex items-center justify-center text-sm md:text-base md:justify-start gap-3 py-2 px-3 rounded-md ${
                    isActive ? 'bg-primary text-black' : 'text-white'
                }`
            }
        >
            <FontAwesomeIcon icon={icon} />
            <p className="text-base font-semibold hidden md:block">{title}</p>
        </NavLink>
    );
};

const MemoziedCustomLink = memo(CustomLink);
export default MemoziedCustomLink;

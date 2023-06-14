import React, { memo, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.css';
import { CustomLinkProps } from '../../interfaces/common';

const CustomLink: React.FC<CustomLinkProps> = ({ link }) => {
    const location = useLocation();
    const { title, to, icon } = link;

    const activeState = useMemo(
        () => to === '/' && location.pathname.includes('library'),
        [location.pathname, to]
    );

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `custom-link ${
                    isActive || activeState ? 'custom-link-active' : ''
                }`
            }
        >
            <FontAwesomeIcon icon={icon} />
            <p className="link-title">{title}</p>
        </NavLink>
    );
};

const MemoziedCustomLink = memo(CustomLink);
export default MemoziedCustomLink;

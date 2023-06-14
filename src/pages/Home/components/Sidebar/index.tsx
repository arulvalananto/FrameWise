import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRightFromBracket,
    faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

import './index.css';
import { navLinks } from '../../../../static/data';
import { trimStr } from '../../../../common/helpers';
import logoIcon from '../../../../assets/logo-icon.svg';
import { LinkProps } from '../../../../interfaces/common';
import logo from '../../../../assets/logo-transparent.svg';
import MemoziedCustomLink from '../../../../components/CustomLink';

const Sidebar: React.FC = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    const imageUrl = useMemo(() => {
        return user && user.picture
            ? user.picture
            : 'https://xsgames.co/randomusers/avatar.php?g=pixel';
    }, [user]);

    const handleLogin = () => {
        loginWithRedirect();
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <section id="sidebar" className="sidebar">
            <div className="sidebar-logo-container">
                <Link to="/" className="sidebar-link">
                    <img src={logo} alt="framewise" className="sidebar-logo" />
                    <img
                        src={logoIcon}
                        alt="framewise"
                        className="sidebar-mobile-logo"
                    />
                </Link>
                <div className="sidebar-profile-container">
                    <img
                        src={imageUrl}
                        alt="profile"
                        className="sidebar-profile"
                    />
                    <p>{trimStr(user && user.name ? user.name : 'Guest')}</p>
                </div>
                <div className="sidebar-navlinks">
                    {navLinks?.map((link: LinkProps) => (
                        <MemoziedCustomLink key={link?.title} link={link} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-6 items-center">
                <div className="w-8 h-8 md:hidden">
                    <img
                        src={imageUrl}
                        alt="profile"
                        className="w-full h-full rounded-full"
                    />
                </div>
                {isAuthenticated ? (
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="sidebar-logout"
                    >
                        <FontAwesomeIcon
                            icon={faRightToBracket}
                            fontSize={20}
                        />
                        <p className="text-base font-semibold">Logout</p>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="sidebar-login"
                    >
                        <FontAwesomeIcon
                            icon={faRightFromBracket}
                            fontSize={20}
                        />
                        <p className="text-base font-semibold">Login</p>
                    </button>
                )}
            </div>
        </section>
    );
};

const MemoziedSidebar = React.memo(Sidebar);
export default MemoziedSidebar;

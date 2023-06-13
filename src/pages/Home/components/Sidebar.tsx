import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRightFromBracket,
    faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

import { navLinks } from '../../../static/data';
import { trimStr } from '../../../common/helpers';
import logoIcon from '../../../assets/logo-icon.svg';
import { LinkProps } from '../../../interfaces/common';
import logo from '../../../assets/logo-transparent.svg';
import MemoziedCustomLink from '../../../components/CustomLink';

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
        <section
            id="sidebar"
            className="w-[65px] md:w-[240px] h-full flex-none min-w-[50px] border-r border-zinc-900 py-10 md:p-2 md:pb-10 flex flex-col items-center gap-5 justify-between"
        >
            <div className="flex flex-col gap-6">
                <Link
                    to="/"
                    className="w-16 md:w-48 h-16 md:h-32 flex items-center justify-center"
                >
                    <img
                        src={logo}
                        alt="framewise"
                        className="w-48 hidden md:block scale-125"
                    />
                    <img
                        src={logoIcon}
                        alt="framewise"
                        className="w-16 h-16 block md:hidden"
                    />
                </Link>
                <div className="w-full h-16 rounded-full my-16 flex-col gap-2 items-center hidden md:flex">
                    <img
                        src={imageUrl}
                        alt="profile"
                        className="w-16 h-full rounded-full"
                    />
                    <p>{trimStr(user && user.name ? user.name : 'Guest')}</p>
                </div>
                <div className="flex flex-col items-center w-full md:w-48 gap-5 mt-20 md:mt-0">
                    {navLinks?.map((link: LinkProps) => (
                        <MemoziedCustomLink key={link?.title} link={link} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-6 items-center">
                <div className="w-8 h-8 md:hidden">
                    <img
                        src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                        alt="profile"
                        className="w-full h-full rounded-full"
                    />
                </div>
                {isAuthenticated ? (
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-10 md:w-48 items-center gap-3 py-2 px-3 rounded-md text-white hover:bg-primary hover:text-black hidden md:flex"
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
                        className="w-10 md:w-48 items-center gap-3 py-2 px-3 rounded-md text-white hover:bg-primary hover:text-black hidden md:flex"
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

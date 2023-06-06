import { faPager, faSliders } from '@fortawesome/free-solid-svg-icons';

import { LinkProps } from '../components/CustomLink/index.interface';

export const navLinks: LinkProps[] = [
    {
        title: 'Dashboard',
        icon: faPager,
        to: '/',
    },
    {
        title: 'Settings',
        icon: faSliders,
        to: '/settings',
    },
];

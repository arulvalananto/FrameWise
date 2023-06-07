import {
    faPager,
    faSliders,
    faFilter,
    faArrowUpZA,
    faArrowDownAZ,
    faArrowUpWideShort,
    faArrowDownShortWide,
} from '@fortawesome/free-solid-svg-icons';

import { LinkProps, SorterOptionProps } from '../interfaces/common';

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

export const sorterOptions: SorterOptionProps[] = [
    {
        title: 'Last Modified (desc)',
        icon: faArrowUpWideShort,
        value: '-lastModified',
    },
    {
        title: 'Last Modified (asc)',
        icon: faArrowDownShortWide,
        value: 'lastModified',
    },
    { title: 'Name (desc)', icon: faArrowDownAZ, value: '-name' },
    { title: 'Name (asc)', icon: faArrowUpZA, value: 'name' },
];

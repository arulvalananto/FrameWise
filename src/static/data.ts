import {
    faPager,
    faSliders,
    faArrowUpZA,
    faArrowDownAZ,
    faArrowUpWideShort,
    faArrowDownShortWide,
} from '@fortawesome/free-solid-svg-icons';

import constants from './constants.json';
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

export const fileSupportTypes = [constants.VIDEO_FILE_FORMAT];

export const chartColors = [
    '#FFC850',
    '#6BE898',
    '#CD92D8',
    '#825A50',
    '#999999',
];

export const sentimentColors = ['chip', 'place', 'topic'];

export const emotionsColors: any = {
    angry: '#E71E24',
    sad: '#1A61AF',
    joy: '#48B83E',
    surprised: '#FBE925',
    fear: '#F6911F',
    disgusted: '#612D91',
};

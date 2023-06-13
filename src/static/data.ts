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

export const emotions: any = {
    anger: { color: '#E71E24', icon: '😡', textColor: 'text-anger' },
    sad: { color: '#1A61AF', icon: '🥺', textColor: 'text-sad' },
    joy: { color: '#48B83E', icon: '😀', textColor: 'text-joy' },
    surprised: { color: '#FBE925', icon: '😮', textColor: 'text-surprised' },
    fear: { color: '#F6911F', icon: '😨', textColor: 'text-fear' },
    disgusted: { color: '#612D91', icon: '🤢', textColor: 'text-disgusted' },
};

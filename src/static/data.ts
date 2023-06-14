import {
    faSliders,
    faArrowUpZA,
    faPhotoFilm,
    faArrowDownAZ,
    faArrowUpWideShort,
    faArrowDownShortWide,
} from '@fortawesome/free-solid-svg-icons';

import constants from './constants.json';
import {
    EmotionColors,
    LinkProps,
    SorterOptionProps,
} from '../interfaces/common';

export const navLinks: LinkProps[] = [
    {
        title: 'Library',
        icon: faPhotoFilm,
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

export const fileSupportTypes = [constants.UPLOAD.VIDEO_FILE_FORMAT];

export const chartColors = [
    '#FFC850',
    '#6BE898',
    '#CD92D8',
    '#825A50',
    '#999999',
];

export const sentimentColors = ['chip', 'place', 'topic'];

export const emotions: EmotionColors = {
    anger: { color: '#E71E24', icon: '😡', textColor: 'text-anger' },
    sad: { color: '#1A61AF', icon: '🥺', textColor: 'text-sad' },
    joy: { color: '#48B83E', icon: '😀', textColor: 'text-joy' },
    surprised: { color: '#FBE925', icon: '😮', textColor: 'text-surprised' },
    fear: { color: '#F6911F', icon: '😨', textColor: 'text-fear' },
    disgusted: { color: '#612D91', icon: '🤢', textColor: 'text-disgusted' },
};

export const paperStyles = {
    elevation: 0,
    sx: {
        background: '#1A1C1E',
        color: '#ffffff',
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
    },
};

export const viewList: string[] = [
    'keyword',
    'face',
    'brand',
    'emotion',
    'sentiment',
    'place',
    'topic',
    'label',
    'mention',
];

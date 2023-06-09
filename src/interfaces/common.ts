import { IconProp, IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface LinkProps {
    title: string;
    to: string;
    icon: IconProp | IconDefinition;
}

export interface CustomLinkProps {
    link: LinkProps;
}

export interface SorterOptionProps {
    icon: IconProp | IconDefinition;
    title: string;
    value: 'name' | '-name' | 'lastModified' | '-lastModified';
}

export interface TimelineProps {
    start: number;
    end: number;
    width: number;
    period: string;
}

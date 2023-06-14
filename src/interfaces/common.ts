import { IconProp, IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface LinkProps {
    title: string;
    to: string;
    icon: IconProp | IconDefinition;
}

export type CustomLinkProps = {
    link: LinkProps;
};

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

interface EmotionColor {
    color: string;
    icon: string;
    textColor: string;
}
export interface EmotionColors {
    [key: string]: EmotionColor;
    anger: EmotionColor;
    sad: EmotionColor;
    joy: EmotionColor;
    surprised: EmotionColor;
    fear: EmotionColor;
    disgusted: EmotionColor;
}

export interface IJWTToken {
    exp: number;
}

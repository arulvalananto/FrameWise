import { IconProp, IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type LinkProps = {
    title: string;
    to: string;
    icon: IconProp | IconDefinition;
};

export type CustomLinkProps = {
    link: LinkProps;
};

export type SorterOptionProps = {
    icon: IconProp | IconDefinition;
    title: string;
    value: 'name' | '-name' | 'lastModified' | '-lastModified';
};

export type TimelineProps = {
    start: number;
    end: number;
    width: number;
    period: string;
};

export interface EmotionColor {
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

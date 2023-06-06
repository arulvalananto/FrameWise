import { IconProp, IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface LinkProps {
    title: string;
    to: string;
    icon: IconProp | IconDefinition;
}

export interface CustomLinkProps {
    link: LinkProps;
}

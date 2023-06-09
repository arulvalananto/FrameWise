import React from 'react';

interface RedirectLinkProps {
    href: string;
    title?: string | React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

const RedirectLink: React.FC<RedirectLinkProps> = ({
    href,
    title,
    children,
    ...props
}) => {
    return (
        <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
            {title ? title : children}
        </a>
    );
};

const MemoziedRedirectLink = React.memo(RedirectLink);
export default MemoziedRedirectLink;

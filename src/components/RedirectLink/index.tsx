import React from 'react';

interface RedirectLinkProps {
    href: string;
    title: string;
    className?: string;
}

const RedirectLink: React.FC<RedirectLinkProps> = ({
    href,
    title,
    ...props
}) => {
    return (
        <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
            {title}
        </a>
    );
};

const MemoziedRedirectLink = React.memo(RedirectLink);
export default MemoziedRedirectLink;

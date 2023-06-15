import React from 'react';
import { useNavigate } from 'react-router-dom';

import './BackButton.css';

type BackButtonProps = {
    to: string;
    title: string;
    className?: string;
};

const BackButton: React.FC<BackButtonProps> = ({
    to,
    title,
    className,
    ...props
}) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(to);
    };

    return (
        <button
            type="button"
            className={className ? className : 'backButton'}
            onClick={handleNavigate}
            {...props}
        >
            {title}
        </button>
    );
};

const MemoziedBackButton = React.memo(BackButton);

export { BackButton, MemoziedBackButton };

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { DialogContent, DialogTitle, Dialog } from '@mui/material';

import useIsMobile from '../../hooks/useIsMobile';

type DialogboxProps = {
    open: boolean;
    handleClose: () => void;
    title: string;
    children: React.ReactNode;
};

const Dialogbox: React.FC<DialogboxProps> = ({
    open,
    handleClose,
    title,
    children,
}) => {
    const isMobile = useIsMobile();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={isMobile}
            fullWidth={!isMobile}
        >
            <DialogTitle className="bg-secondary text-white">
                {title}
            </DialogTitle>
            <DialogContent className="bg-secondary">{children}</DialogContent>
            <button
                type="button"
                onClick={handleClose}
                aria-label="close dialog"
            >
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="absolute top-5 right-6 cursor-pointer text-white"
                    fontSize={24}
                />
            </button>
        </Dialog>
    );
};

const CustomDialogbox = React.memo(Dialogbox);
export default CustomDialogbox;

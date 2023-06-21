import * as React from 'react';
import { toast } from 'react-hot-toast';
import Modal from '@mui/material/Modal';
import { useAuth0 } from '@auth0/auth0-react';
import { Divider, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';

import './index.css';
import constants from '../../static/constants.json';

type ConfrimationModalProps = {
    title: string;
    buttonIcon: IconProp | IconDefinition;
    handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    isDeleteProcessing?: boolean;
    message?: string;
    submitText?: string;
    cancelText?: string;
    className?: string;
};

const ConfirmationModal: React.FC<ConfrimationModalProps> = ({
    title,
    buttonIcon,
    handleSubmit,
    disabled = false,
    isDeleteProcessing = false,
    className = '',
    submitText = 'Delete',
    cancelText = 'Cancel',
    message = constants.MESSAGE.DELETE_PROMPT_DEFAULT,
}) => {
    const [open, setOpen] = React.useState(false);
    const { isAuthenticated } = useAuth0();

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (isAuthenticated) {
            setOpen(true);
        } else if (!isAuthenticated) {
            toast.error(constants.ERROR_MESSAGE.GUEST_RESTRICTION);
        }
    };
    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setOpen(false);
    };

    return (
        <>
            <Tooltip title={title} arrow placement="top">
                <button
                    type="button"
                    aria-label={title}
                    className={className ? className : 'confirmation-button'}
                    disabled={isDeleteProcessing || disabled}
                    onClick={handleOpen}
                >
                    <FontAwesomeIcon icon={buttonIcon} />
                </button>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal-container">
                    <div className="modal-wrapper">
                        <h3 className="modal-title">{title}</h3>
                        <Divider />
                        <p className="modal-message">{message}</p>
                        <div className="modal-button-container">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isDeleteProcessing}
                                className="modal-cancel-button"
                            >
                                {cancelText}
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isDeleteProcessing}
                                className="modal-submit-button"
                            >
                                {isDeleteProcessing ? (
                                    <span>Loading</span>
                                ) : (
                                    <span>{submitText}</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

const MemoziedConfirmationModal = React.memo(ConfirmationModal);
export { ConfirmationModal, MemoziedConfirmationModal };

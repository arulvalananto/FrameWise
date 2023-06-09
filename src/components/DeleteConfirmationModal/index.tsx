import * as React from 'react';
import { Divider } from '@mui/material';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';

import constants from '../../static/constants.json';

interface DeleteConfirmationProps {
    title: string;
    buttonIcon: IconProp | IconDefinition;
    handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    isDeleteProcessing?: boolean;
    message?: string;
    submitText?: string;
    cancelText?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationProps> = ({
    title,
    buttonIcon,
    handleSubmit,
    disabled = false,
    isDeleteProcessing = false,
    submitText = 'Delete',
    cancelText = 'Cancel',
    message = constants.MESSAGE.DELETE_PROMPT_DEFAULT,
}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        event?.stopPropagation();
        setOpen(true);
    };
    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event?.stopPropagation();
        setOpen(false);
    };

    return (
        <>
            <button
                type="button"
                aria-label="delete video"
                className="bg-darkgrey absolute text-xs bg-opacity-75 rounded px-2 py-1 top-4 lg:top-2 right-2 hover:scale-95"
                disabled={isDeleteProcessing || disabled}
                onClick={handleOpen}
            >
                <FontAwesomeIcon icon={buttonIcon} />
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded w-[280px] sm:w-[350px] md:w-[400px] bg-secondary">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm md:text-3xl">{title}</h3>
                        <Divider />
                        <p className="text-xs md:text-base">{message}</p>
                        <div className="flex flex-row justify-end gap-6 mt-6">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isDeleteProcessing}
                                className="bg-gray-100 text-black px-4 py-2 border rounded hover:scale-105 text-xs md:text-base"
                            >
                                {cancelText}
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isDeleteProcessing}
                                className="bg-primary px-4 py-2 text-black rounded hover:scale-105 text-xs md:text-base"
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

const MemoziedConfirmationModal = React.memo(DeleteConfirmationModal);
export default MemoziedConfirmationModal;

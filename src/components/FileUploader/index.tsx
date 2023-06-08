import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import React, { memo, useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { DialogContent, DialogTitle, Dialog, Tooltip } from '@mui/material';

import { AppDispatch } from '../../store';
import constants from '../../static/constants.json';
import { fileSupportTypes } from '../../static/data';
import { fetchAllVideos } from '../../store/reducers/videos/index.thunk';
import { postVideo, uploadVideo } from '../../api/helpers';
import { VideoState } from '../../store/reducers/videos/index.interface';

const FileUploader: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [isFileUploading, setIsFileUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const isValidFile = (file: File) => {
        if (
            !fileSupportTypes?.includes(file.type.split('/')[0].toLowerCase())
        ) {
            toast.error(constants.ERROR_MESSAGE.UNSUPPORTED_FILE_TYPE);
            return false;
        }
        if (file.size > constants.FILE_SIZE_LIMIT) {
            toast.error(constants.ERROR_MESSAGE.FILE_LIMIT_EXIST);
            return false;
        }
        return true;
    };

    const handleFileUpload = useCallback(
        async (files: FileList | null) => {
            try {
                if (files) {
                    const file = files[0];
                    if (isValidFile(file)) {
                        const formData = new FormData();
                        formData.append('file', file);

                        const { filename, blob_url } = await uploadVideo(
                            formData
                        );
                        if (filename && blob_url) {
                            const indexDetails: VideoState = await postVideo(
                                filename,
                                blob_url
                            );

                            if (
                                indexDetails?.state?.toLowerCase() ===
                                constants.UPLOAD_VIDEO_STATUS
                            ) {
                                dispatch(fetchAllVideos());
                                toast.success(
                                    constants.SUCCESS_MESSAGE.FILE_UPLOAD
                                );
                            } else {
                                throw new Error(
                                    constants.ERROR_MESSAGE.UPLOAD_FAILED
                                );
                            }
                        } else {
                            throw new Error(
                                constants.ERROR_MESSAGE.UPLOAD_FAILED
                            );
                        }
                    }
                }
                handleClose();
                setIsFileUploading(false);
            } catch (error: unknown) {
                if (error instanceof Error || error instanceof AxiosError) {
                    toast.error(error?.message);
                }
                setIsFileUploading(false);
            }
        },
        [dispatch]
    );

    const handleFileChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            try {
                setIsFileUploading(true);

                await handleFileUpload(event?.target?.files);
            } catch (error: unknown) {
                if (error instanceof Error || error instanceof AxiosError) {
                    toast.error(error?.message);
                }
                setIsFileUploading(false);
            }
        },
        [handleFileUpload]
    );

    const handleDragOver = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(true);
    };

    const handleDragEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        setIsDragging(true);
    };

    const handleDragLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        setIsDragging(false);
    };

    const handleDrop = useCallback(
        async (event: React.DragEvent<HTMLParagraphElement>) => {
            try {
                event.preventDefault();
                event.stopPropagation();

                setIsDragging(false);
                setIsFileUploading(true);
                const { files } = event.dataTransfer;

                await handleFileUpload(files);
                handleClose();
            } catch (error: unknown) {
                if (error instanceof Error || error instanceof AxiosError) {
                    toast.error(error?.message);
                }
                setIsFileUploading(false);
            }
        },
        [handleFileUpload]
    );

    return (
        <>
            <Tooltip title={constants.TOOLTIP.UPLOAD_FILE} arrow>
                <button
                    type="button"
                    onClick={handleClickOpen}
                    aria-label="Upload"
                    className="bg-primary text-black px-4 py-2 rounded hover:scale-95 transition-all"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Upload and Index</DialogTitle>
                <DialogContent>
                    {isFileUploading ? (
                        <p>Loading...</p>
                    ) : (
                        <div
                            className={`relative flex flex-col items-center bg-gray-50 justify-center gap-3 pt-1 w-full h-48 ${
                                isDragging ? 'border-2 border-dashed' : ''
                            }`}
                            onDragOver={handleDragOver}
                        >
                            {!isDragging && (
                                <>
                                    <p>Drag and drop files</p>
                                    <span className="text-sm text-slate-500">
                                        or
                                    </span>
                                    <div className="cursor-pointer">
                                        <label
                                            htmlFor="video"
                                            className="px-4 py-2 cursor-pointer w-full h-full bg-blue-500 text-white rounded"
                                        >
                                            <span className="text-sm">
                                                Browse files
                                            </span>
                                            <input
                                                type="file"
                                                id="video"
                                                accept="video/*"
                                                required
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                </>
                            )}
                            {isDragging && (
                                <p
                                    className="absolute top-0 left-0 bg-gray-100 w-full h-full"
                                    onDrop={handleDrop}
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                >
                                    <span className="flex items-center justify-center w-full h-full">
                                        Please drop your file here
                                    </span>
                                </p>
                            )}
                        </div>
                    )}
                </DialogContent>
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="close dialog"
                >
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="absolute top-2 right-2 cursor-pointer"
                        fontSize={24}
                    />
                </button>
            </Dialog>
        </>
    );
};

const MemoziedFileUploader = memo(FileUploader);
export default MemoziedFileUploader;

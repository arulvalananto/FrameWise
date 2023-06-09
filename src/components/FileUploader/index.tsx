import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import React, { memo, useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { DialogContent, DialogTitle, Dialog, Tooltip } from '@mui/material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { storage } from '../../firebase';
import { AppDispatch } from '../../store';
import { uploadVideo } from '../../api/helpers';
import { trimStr } from '../../common/helpers';
import useIsMobile from '../../hooks/useIsMobile';
import constants from '../../static/constants.json';
import { fileSupportTypes } from '../../static/data';
import MemoziedFileUploaderState from './components/FileUploaderState';
import { fetchAllVideos } from '../../store/reducers/videos/index.thunk';
import { VideoState } from '../../store/reducers/videos/index.interface';

const FileUploader: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [isFileUploading, setIsFileUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgressState, setUploadProgressState] = useState(0);

    const isMobile = useIsMobile();
    const dispatch = useDispatch<AppDispatch>();

    const handleOpen = () => {
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

    const uploadVideoForIndexing = useCallback(
        async (fileName: string, blobUrl: string): Promise<void> => {
            try {
                if (fileName && blobUrl) {
                    const indexDetails: VideoState = await uploadVideo(
                        fileName,
                        blobUrl
                    );

                    if (
                        indexDetails?.state?.toLowerCase() ===
                        constants.UPLOAD_VIDEO_STATUS
                    ) {
                        dispatch(fetchAllVideos());
                        toast.success(constants.SUCCESS_MESSAGE.FILE_UPLOAD);
                    } else {
                        throw new Error(constants.ERROR_MESSAGE.UPLOAD_FAILED);
                    }
                } else {
                    throw new Error(constants.ERROR_MESSAGE.UPLOAD_FAILED);
                }
                handleClose();
                setIsFileUploading(false);
                setUploadProgressState(0);
            } catch (error) {
                if (error instanceof Error || error instanceof AxiosError) {
                    toast.error(error?.message);
                }
                setIsFileUploading(false);
                setUploadProgressState(0);
            }
        },
        [dispatch]
    );

    const handleFileUpload = useCallback(
        async (files: FileList | null): Promise<void> => {
            try {
                if (files) {
                    const file = files[0];
                    if (isValidFile(file)) {
                        const fileName = trimStr(file?.name, 25);
                        const storageRef = ref(storage, fileName);

                        const uploadTask = uploadBytesResumable(
                            storageRef,
                            file
                        );
                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                                const { bytesTransferred, totalBytes } =
                                    snapshot;
                                setUploadProgressState(
                                    (bytesTransferred / totalBytes) * 100
                                );
                            },
                            (error) => toast.error(error?.message),
                            () => {
                                getDownloadURL(uploadTask.snapshot.ref).then(
                                    async (downloadURL) => {
                                        await uploadVideoForIndexing(
                                            fileName,
                                            downloadURL
                                        );
                                    }
                                );
                            }
                        );
                    }
                }
            } catch (error: unknown) {
                if (error instanceof Error || error instanceof AxiosError) {
                    toast.error(error?.message);
                }
                setIsFileUploading(false);
                setUploadProgressState(0);
            }
        },
        [uploadVideoForIndexing]
    );

    const handleFileChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
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

    const handleDragOver = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(true);
    };

    const handleDragEnter = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();
        event.stopPropagation();

        setIsDragging(true);
    };

    const handleDragLeave = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();
        event.stopPropagation();

        setIsDragging(false);
    };

    const handleDrop = useCallback(
        async (event: React.DragEvent<HTMLParagraphElement>): Promise<void> => {
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
                    onClick={handleOpen}
                    aria-label="Upload"
                    className="bg-primary text-black px-4 py-2 rounded hover:scale-95 transition-all"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen={isMobile}
                fullWidth={!isMobile}
            >
                <DialogTitle className="bg-secondary text-white">
                    Upload and Index
                </DialogTitle>
                <DialogContent className="bg-secondary">
                    {isFileUploading ? (
                        <MemoziedFileUploaderState
                            uploadProgressState={uploadProgressState}
                        />
                    ) : (
                        <div
                            className={`relative flex flex-col items-center text-white justify-center gap-4 pt-1 w-full h-48 ${
                                isDragging
                                    ? 'border-2 border-gray-700 border-dashed'
                                    : ''
                            }`}
                            onDragOver={handleDragOver}
                        >
                            {isDragging ? (
                                <p
                                    className="absolute top-0 left-0  w-full h-full bg-light-secondary"
                                    onDrop={handleDrop}
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                >
                                    <span className="flex items-center justify-center w-full h-full">
                                        🚀 Please drop your file here 🚀
                                    </span>
                                </p>
                            ) : (
                                <>
                                    <p>Drag and drop files</p>
                                    <span className="text-sm text-slate-300">
                                        or
                                    </span>
                                    <div className="cursor-pointer">
                                        <label
                                            htmlFor="video"
                                            className="px-4 py-2 cursor-pointer w-full h-full bg-primary text-black rounded"
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
                        className="absolute top-5 right-6 cursor-pointer text-white"
                        fontSize={24}
                    />
                </button>
            </Dialog>
        </>
    );
};

const MemoziedFileUploader = memo(FileUploader);
export default MemoziedFileUploader;

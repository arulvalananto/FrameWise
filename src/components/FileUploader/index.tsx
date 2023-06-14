import { AxiosError } from 'axios';
import { Tooltip } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import React, { useCallback, useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { storage } from '../../firebase';
import { AppDispatch } from '../../store';
import CustomDialogbox from '../Dialogbox';
import { trimStr } from '../../common/helpers';
import { indexVideo } from '../../api/videos';
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
        if (file.size > constants.UPLOAD.FILE_SIZE_LIMIT) {
            toast.error(constants.ERROR_MESSAGE.FILE_LIMIT_EXIST);
            return false;
        }
        return true;
    };

    const uploadVideoForIndexing = useCallback(
        async (fileName: string, blobUrl: string): Promise<void> => {
            try {
                if (fileName && blobUrl) {
                    const indexDetails: VideoState = await indexVideo(
                        fileName,
                        blobUrl
                    );

                    if (
                        indexDetails?.state?.toLowerCase() ===
                        constants.UPLOAD.VIDEO_STATUS
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
                        const fileName = trimStr(file?.name, 50);
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
                    className="bg-primary text-black px-4 py-2 rounded hover:scale-95 transition-all text-xs md:text-base"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </Tooltip>
            <CustomDialogbox
                title="Upload and Index"
                open={open}
                handleClose={handleClose}
            >
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
                                    {constants.UPLOAD.DROP_MESSAGE}
                                </span>
                            </p>
                        ) : (
                            <>
                                <p>{constants.UPLOAD.DRAG_AND_DROP_LABEL}</p>
                                <span className="text-sm text-slate-300">
                                    or
                                </span>
                                <div className="cursor-pointer">
                                    <label
                                        htmlFor="video"
                                        className="px-4 py-2 cursor-pointer w-full h-full bg-primary text-black rounded"
                                    >
                                        <span className="text-sm">
                                            {constants.UPLOAD.LABEL}
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
            </CustomDialogbox>
        </>
    );
};

export default FileUploader;

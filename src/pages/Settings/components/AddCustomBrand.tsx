import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import constants from '../../../static/constants.json';
import CustomDialogbox from '../../../components/Dialogbox';
import { createNewCustomBrand } from '../../../api/settings';
import { addCustomBrand } from '../../../store/reducers/app';

type CustomBrandInitialState = {
    name: string;
    category: string;
    description: string;
    referenceWikiUrl: string;
};

const initialState = {
    name: '',
    category: '',
    description: '',
    referenceWikiUrl: '',
};

const AddCustomBrand: React.FC = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>(false);
    const [isSubmittedProcessing, setIsSubmittedProcessing] =
        useState<boolean>(false);
    const [customBrand, setCustomBrand] =
        useState<CustomBrandInitialState>(initialState);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = event.target;

        setCustomBrand({ ...customBrand, [name]: value });
    };

    const isValidBrand = (): boolean => {
        let isValid = true;
        if (customBrand.name.length > 25 || !customBrand.name) {
            toast.error(constants.CUSTOM_BRAND.FORM.NAME_LIMIT);
            isValid = false;
        }
        if (
            customBrand.category.split(',').filter((el) => el).length > 3 ||
            !customBrand.category
        ) {
            toast.error(constants.CUSTOM_BRAND.FORM.CATEGORY_LIMIT);
            isValid = false;
        }

        if (customBrand.description.length < 25) {
            toast.error(constants.CUSTOM_BRAND.FORM.DESCRIPTION_LIMIT);
            isValid = false;
        }

        if (
            customBrand.referenceWikiUrl &&
            !customBrand.referenceWikiUrl.includes('wikipedia.org')
        ) {
            toast.error(constants.CUSTOM_BRAND.FORM.REFERNCE_URL_LIMIT);
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        try {
            event.preventDefault();
            if (isValidBrand()) {
                setIsSubmittedProcessing(true);
                const response = await createNewCustomBrand({
                    id: -1,
                    name: customBrand.name,
                    tags: customBrand.category
                        ?.split(',')
                        .filter((el) => el)
                        .map((el) => el.trim()),
                    enabled: true,
                    description: customBrand.description,
                    referenceUrl: customBrand.referenceWikiUrl,
                });
                dispatch(addCustomBrand(response));
                toast.success(constants.SUCCESS_MESSAGE.BRAND_CREATED);
                handleClose();
                setCustomBrand(initialState);
            }
            setIsSubmittedProcessing(false);
        } catch (error: unknown) {
            setIsSubmittedProcessing(false);
            if (error instanceof Error) toast.error(error?.message);
            else if (error instanceof AxiosError)
                toast.error(error?.response?.data?.message);
        }
    };

    return (
        <>
            <Tooltip title={constants.TOOLTIP.INCLUDE_CUSTOM_BRAND} arrow>
                <button
                    type="button"
                    onClick={handleOpen}
                    aria-label="Upload"
                    className="addcustombrand-button"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </Tooltip>
            <CustomDialogbox
                title="Include custom brand"
                open={open}
                handleClose={handleClose}
            >
                <form
                    className="w-full h-full flex flex-col gap-2"
                    onSubmit={handleSubmit}
                >
                    <div className="w-full text-gray-200 flex flex-col gap-1">
                        <label className="text-xs">
                            Brand Name{' '}
                            <span className="text-red-500 text-xl">*</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            className="custom-input"
                            placeholder="Name"
                            autoComplete="off"
                            value={customBrand.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full text-gray-200">
                        <label className="text-xs">
                            Category{' '}
                            <span className="text-red-500 text-xl">*</span>
                        </label>
                        <input
                            name="category"
                            type="text"
                            className="custom-input"
                            placeholder="Category"
                            autoComplete="off"
                            value={customBrand.category}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full text-gray-200">
                        <label className="text-xs">Reference Url (Wiki)</label>
                        <input
                            name="referenceWikiUrl"
                            type="text"
                            className="custom-input"
                            placeholder="Wiki url"
                            autoComplete="off"
                            value={customBrand.referenceWikiUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full text-gray-200">
                        <label className="text-xs">
                            Description{' '}
                            <span className="text-red-500 text-xl">*</span>
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            className="custom-input resize-none"
                            placeholder="Description"
                            autoComplete="off"
                            value={customBrand.description}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        disabled={
                            isSubmittedProcessing ||
                            !customBrand.category ||
                            !customBrand.description ||
                            !customBrand.name
                        }
                        type="submit"
                        className="self-end px-4 py-1 bg-primary text-black hover:scale-115 rounded mt-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {isSubmittedProcessing ? 'Loading' : 'Save'}
                    </button>
                </form>
            </CustomDialogbox>
        </>
    );
};

const MemoziedAddCustomBrand = React.memo(AddCustomBrand);
export default MemoziedAddCustomBrand;

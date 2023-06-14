import React from 'react';
import { AxiosError } from 'axios';
import { Tooltip } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppDispatch } from '../../../store';
import AddCustomBrand from './AddCustomBrand';
import { trimStr } from '../../../common/helpers';
import useIsMobile from '../../../hooks/useIsMobile';
import Searchbox from '../../../components/Searchbox';
import constants from '../../../static/constants.json';
import { deleteCustomBrand } from '../../../api/settings';
import MemoziedRedirectLink from '../../../components/RedirectLink';
import { CustomBrand } from '../../../store/reducers/app/index.interface';
import { getCustomBrands } from '../../../store/reducers/app/index.thunk';
import {
    appSelector,
    changeCustomBrandSearchText,
    deleteCustomBrandById,
} from '../../../store/reducers/app';

const CustomBrands: React.FC = () => {
    const { isAuthenticated } = useAuth0();
    const dispatch = useDispatch<AppDispatch>();
    const { customBrands, customBrandSearchText } = useSelector(appSelector);

    const isMobile = useIsMobile();
    const shouldRender = React.useRef(true);
    const [isDeleteProcessing, setIsDeleteProcessing] =
        React.useState<boolean>();

    const filteredCustomBrands: CustomBrand[] = React.useMemo(() => {
        return customBrands?.filter((brand) =>
            brand?.name?.toLowerCase()?.includes(customBrandSearchText)
        );
    }, [customBrands, customBrandSearchText]);

    const handleBrandSearchTextChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(changeCustomBrandSearchText(event?.target?.value));
    };

    const handleDeleteCustomBrand = async (id: number): Promise<void> => {
        try {
            if (isAuthenticated) {
                setIsDeleteProcessing(true);
                const response = await deleteCustomBrand(id);
                if (response === 'ok') {
                    dispatch(deleteCustomBrandById({ id }));
                    toast.success(constants.SUCCESS_MESSAGE.BRAND_DELETED);
                }
                setIsDeleteProcessing(false);
            } else {
                toast.error(constants.ERROR_MESSAGE.GUEST_RESTRICTION);
            }
        } catch (error: unknown) {
            setIsDeleteProcessing(false);
            if (error instanceof Error) toast.error(error?.message);
            else if (error instanceof AxiosError)
                toast.error(error?.response?.data?.message);
        }
    };

    React.useEffect(() => {
        if (shouldRender.current) {
            shouldRender.current = false;
        }
        dispatch(getCustomBrands());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full h-full p-2">
            <section id="brand" className="flex flex-col gap-3">
                <header className="flex flex-row items-center gap-3">
                    <h5 className="text-sm md:text-base font-bold">
                        {constants.CUSTOM_BRAND.TITLE}
                    </h5>
                    <AddCustomBrand />
                </header>
                <Searchbox
                    value={customBrandSearchText}
                    onChange={handleBrandSearchTextChange}
                    placeholder="Search brands by name"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 justify-items-stretch gap-2">
                    {filteredCustomBrands?.map((brand) => (
                        <div
                            key={brand.id}
                            className="w-full bg-secondary  rounded p-2 py-3 flex flex-col gap-3"
                        >
                            <Tooltip title={brand.name} arrow placement="top">
                                <p className="font-bold text-sm">
                                    {isMobile
                                        ? brand.name
                                        : trimStr(brand.name)}
                                </p>
                            </Tooltip>
                            <div className="flex flex-row items-center gap-2 text-xs">
                                {brand.tags?.map((tag) => (
                                    <p
                                        key={tag}
                                        className="px-2 py-1 rounded-full bg-white text-black cursor-pointer"
                                    >
                                        {tag}
                                    </p>
                                ))}
                            </div>
                            <p className="text-xs break-all h-10">
                                {trimStr(
                                    brand.description,
                                    isMobile ? 200 : 100
                                )}
                                {brand.referenceUrl && (
                                    <>
                                        {brand.description && <span>...</span>}
                                        <MemoziedRedirectLink
                                            href={brand.referenceUrl}
                                            title="Read more"
                                            className="font-bold text-blue-400"
                                        />
                                    </>
                                )}
                            </p>
                            <div className="self-end flex items-center gap-5">
                                <button
                                    type="button"
                                    className="disablad:cursor-not-allowed hover:text-red-500 disabled:text-gray-700 hover:scale-110 transition-all"
                                    disabled={isDeleteProcessing}
                                    onClick={() =>
                                        handleDeleteCustomBrand(brand.id)
                                    }
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CustomBrands;

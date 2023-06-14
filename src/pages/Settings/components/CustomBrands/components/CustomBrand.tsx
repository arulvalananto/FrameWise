import React from 'react';
import { AxiosError } from 'axios';
import { Tooltip } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { AppDispatch } from '../../../../../store';
import { trimStr } from '../../../../../common/helpers';
import useIsMobile from '../../../../../hooks/useIsMobile';
import constants from '../../../../../static/constants.json';
import { deleteCustomBrand } from '../../../../../api/settings';
import MemoziedRedirectLink from '../../../../../components/RedirectLink';
import { deleteCustomBrandById } from '../../../../../store/reducers/app';
import MemoziedConfirmationModal from '../../../../../components/DeleteConfirmationModal';
import { CustomBrand as ICustomBrand } from '../../../../../store/reducers/app/index.interface';
import Tags from './Tags';

type CustomBrandProps = {
    brand: ICustomBrand;
};

const CustomBrand: React.FC<CustomBrandProps> = ({ brand }) => {
    const { isAuthenticated } = useAuth0();
    const dispatch = useDispatch<AppDispatch>();

    const isMobile = useIsMobile();
    const [isDeleteProcessing, setIsDeleteProcessing] =
        React.useState<boolean>();

    const handleDeleteCustomBrand = async (): Promise<void> => {
        try {
            if (isAuthenticated) {
                setIsDeleteProcessing(true);
                const response = await deleteCustomBrand(brand.id);
                if (response === 'ok') {
                    dispatch(deleteCustomBrandById({ id: brand.id }));
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

    return (
        <div
            key={brand.id}
            className="w-full bg-secondary  rounded p-2 py-3 flex flex-col gap-3"
        >
            <Tooltip title={brand.name} arrow placement="top">
                <p className="font-bold text-sm">
                    {isMobile ? brand.name : trimStr(brand.name)}
                </p>
            </Tooltip>
            <Tags tags={brand.tags} />
            <p className="text-xs break-all h-10">
                {trimStr(brand.description, isMobile ? 200 : 100)}
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
                <MemoziedConfirmationModal
                    title="Delete"
                    handleSubmit={handleDeleteCustomBrand}
                    buttonIcon={faTrashCan}
                    disabled={isDeleteProcessing}
                    isDeleteProcessing={isDeleteProcessing}
                    className="disablad:cursor-not-allowed hover:text-red-500 disabled:text-gray-700 hover:scale-110 transition-all"
                />
            </div>
        </div>
    );
};

const MemoizedCustomBrand = React.memo(CustomBrand);
export default MemoizedCustomBrand;

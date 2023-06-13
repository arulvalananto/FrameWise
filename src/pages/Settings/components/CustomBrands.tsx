import React from 'react';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppDispatch } from '../../../store';
import { trimStr } from '../../../common/helpers';
import useIsMobile from '../../../hooks/useIsMobile';
import Searchbox from '../../../components/Searchbox';
import MemoziedRedirectLink from '../../../components/RedirectLink';
import { getCustomBrands } from '../../../store/reducers/app/index.thunk';
import {
    appSelector,
    changeCustomBrandSearchText,
} from '../../../store/reducers/app';

const CustomBrands: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { customBrands, customBrandSearchText } = useSelector(appSelector);

    const isMobile = useIsMobile();
    const shouldRender = React.useRef(true);

    const filteredCustomBrands = React.useMemo(() => {
        return customBrands?.filter((brand) =>
            brand?.name?.toLowerCase()?.includes(customBrandSearchText)
        );
    }, [customBrands, customBrandSearchText]);

    const handleBrandSearchTextChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(changeCustomBrandSearchText(event?.target?.value));
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
                <h5 className="text-sm md:text-base font-bold">Brands</h5>
                <Searchbox
                    value={customBrandSearchText}
                    onChange={handleBrandSearchTextChange}
                    placeholder="Search brands by name"
                />
                <div className="flex flex-row flex-wrap gap-2 items-center place-items-center">
                    {filteredCustomBrands?.map((brand) => (
                        <div className="w-full md:w-72 bg-secondary  rounded p-2 flex flex-col gap-3">
                            <Tooltip title={brand.name} arrow placement="top">
                                <p className="font-bold text-sm">
                                    {isMobile
                                        ? brand.name
                                        : trimStr(brand.name)}
                                </p>
                            </Tooltip>
                            <div className="flex flex-row items-center gap-2 text-xs">
                                {brand.tags?.map((tag) => (
                                    <p className="px-2 py-1 rounded-full bg-white text-black hover:bg-chip cursor-pointer">
                                        {tag}
                                    </p>
                                ))}
                            </div>
                            <p className="text-xs break-all">
                                {trimStr(
                                    brand.description,
                                    isMobile ? 200 : 100
                                )}
                                {brand.referenceUrl && (
                                    <MemoziedRedirectLink
                                        href={brand.referenceUrl}
                                        title="Read more"
                                        className="font-bold text-blue-400"
                                    />
                                )}
                            </p>
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className="self-end cursor-pointer hover:scale-110 transition-all hover:text-red-500"
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CustomBrands;

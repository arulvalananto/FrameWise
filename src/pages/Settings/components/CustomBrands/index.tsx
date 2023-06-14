import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomBrand from './components/CustomBrand';
import { AppDispatch } from '../../../../store';
import AddCustomBrand from '../AddCustomBrand';
import Searchbox from '../../../../components/Searchbox';
import constants from '../../../../static/constants.json';
import { getCustomBrands } from '../../../../store/reducers/app/index.thunk';
import { CustomBrand as ICustomBrand } from '../../../../store/reducers/app/index.interface';
import {
    appSelector,
    changeCustomBrandSearchText,
} from '../../../../store/reducers/app';

const CustomBrands: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { customBrands, customBrandSearchText } = useSelector(appSelector);

    const shouldRender = React.useRef(true);

    const filteredCustomBrands: ICustomBrand[] = React.useMemo(() => {
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
        <div className="custombrands-container">
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
                <div className="custombrands-list">
                    {filteredCustomBrands?.map((brand) => (
                        <CustomBrand brand={brand} key={brand.id} />
                    ))}
                </div>
            </section>
        </div>
    );
};

const MemoziedCustomBrands = React.memo(CustomBrands);
export default MemoziedCustomBrands;

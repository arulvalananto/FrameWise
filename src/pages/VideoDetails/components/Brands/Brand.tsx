import { Tooltip } from '@mui/material';
import React, { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinWide, faScroll } from '@fortawesome/free-solid-svg-icons';

import {
    changeSelectedInsight,
    videoDetailsSelector,
} from '../../../../store/reducers/videoDetails';
import { Brand } from '../../../../store/reducers/videoDetails/index.interface';

interface BrandProps {
    brand: Brand;
}

const Brand: React.FC<BrandProps> = ({ brand }) => {
    const dispatch = useDispatch();
    const { selectedInsight } = useSelector(videoDetailsSelector);

    const handleMoveToSpecificTime = () => {
        dispatch(changeSelectedInsight({ key: 'brand', value: brand }));
    };

    const type = useMemo(
        () => brand?.instances[0]?.brandType,
        [brand?.instances]
    );

    return (
        <p
            className={`py-2 px-4 text-xs md:text-sm text-black rounded-full cursor-pointer select-none flex gap-2 ${
                brand?.id === selectedInsight?.brand?.id
                    ? 'font-bold bg-chip'
                    : 'bg-white'
            } `}
            onClick={handleMoveToSpecificTime}
        >
            <span>{brand?.name}</span>
            <span>|</span>
            <span>
                {type === 'Ocr' ? (
                    <Tooltip title="OCR" placement="top" arrow>
                        <FontAwesomeIcon icon={faFaceGrinWide} />
                    </Tooltip>
                ) : (
                    <Tooltip title="Transcript" placement="top" arrow>
                        <FontAwesomeIcon icon={faScroll} />
                    </Tooltip>
                )}
            </span>
        </p>
    );
};

const MemoziedBrand = memo(Brand);
export default MemoziedBrand;

// ${type === 'Ocr' ? 'text-blue-500' : 'text-green-500'}

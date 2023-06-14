import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faEarthOceania,
} from '@fortawesome/free-solid-svg-icons';

import { trimStr } from '../../../../../common/helpers';
import constants from '../../../../../static/constants.json';
import MemoziedRedirectLink from '../../../../../components/RedirectLink';
import { videoDetailsSelector } from '../../../../../store/reducers/videoDetails';

const PlaceDetails: React.FC = () => {
    const [isShowDescription, setIsShowDescription] = useState(false);

    const {
        selectedInsight: { namedLocation },
    } = useSelector(videoDetailsSelector);

    const toggleShowDescription = () => {
        setIsShowDescription(!isShowDescription);
    };

    if (!namedLocation?.description) {
        return null;
    }
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-3 items-center">
                    <h5 className="text-place font-bold text-sm md:text-base">
                        {namedLocation?.name}
                    </h5>
                    <button
                        className="text-xs flex flex-row items-center gap-1"
                        type="button"
                        onClick={toggleShowDescription}
                    >
                        <span className="hidden sm:block">
                            show description
                        </span>
                        {isShowDescription ? (
                            <FontAwesomeIcon icon={faAngleUp} />
                        ) : (
                            <FontAwesomeIcon icon={faAngleDown} />
                        )}
                    </button>
                </div>
                <MemoziedRedirectLink
                    href={`${constants.INSIGHTS.CONFIG.GOOGLE_MAP_PREFIX}${namedLocation?.name}`}
                >
                    <p className="text-xs bg-black px-2 py-1 border rounded flex items-center gap-2">
                        <FontAwesomeIcon
                            icon={faEarthOceania}
                            spinPulse
                            className="text-place"
                        />
                        <span className="hidden sm:block">
                            {constants.INSIGHTS.CONFIG.FIND_ON_GOOGLE_MAPS}
                        </span>
                    </p>
                </MemoziedRedirectLink>
            </div>
            {isShowDescription && (
                <p className="text-xs">
                    {trimStr(namedLocation?.description, 150)}
                    {namedLocation?.referenceUrl && (
                        <MemoziedRedirectLink
                            href={namedLocation?.referenceUrl}
                            title="Read More"
                            className="font-bold ml-1"
                        />
                    )}
                </p>
            )}
        </div>
    );
};

const MemoziedPlaceDetails = React.memo(PlaceDetails);
export default MemoziedPlaceDetails;

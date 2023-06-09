import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { trimStr } from '../../../../common/helpers';
import constants from '../../../../static/constants.json';
import MemoziedRedirectLink from '../../../../components/RedirectLink';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const BrandDetails: React.FC = () => {
    const [isShowDescription, setIsShowDescription] = useState(false);
    const {
        selectedInsight: { brand },
    } = useSelector(videoDetailsSelector);

    const toggleShowDescription = () => {
        setIsShowDescription(!isShowDescription);
    };

    if (!brand?.description) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-3 items-center">
                    <h5 className="text-chip font-bold">{brand?.name}</h5>
                    <button
                        className="text-xs flex flex-row items-center gap-1"
                        type="button"
                        onClick={toggleShowDescription}
                    >
                        <span>show description</span>
                        {isShowDescription ? (
                            <FontAwesomeIcon icon={faAngleUp} />
                        ) : (
                            <FontAwesomeIcon icon={faAngleDown} />
                        )}
                    </button>
                </div>
                <MemoziedRedirectLink
                    href={`${constants.GOOGLE_PREFIX}${brand?.name}`}
                >
                    <p className="text-xs bg-black px-2 py-1 border rounded flex items-center gap-2">
                        <span>Find on Google</span>
                    </p>
                </MemoziedRedirectLink>
            </div>
            {isShowDescription && (
                <p className="text-xs">
                    {trimStr(brand?.description, 150)}
                    {brand?.referenceUrl && (
                        <MemoziedRedirectLink
                            href={brand?.referenceUrl}
                            title="Read More"
                            className="font-bold ml-1"
                        />
                    )}
                </p>
            )}
        </div>
    );
};

export default BrandDetails;
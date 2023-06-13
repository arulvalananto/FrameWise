import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import { trimStr } from '../../../../common/helpers';
import constants from '../../../../static/constants.json';
import MemoziedRedirectLink from '../../../../components/RedirectLink';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const MentionDetails: React.FC = () => {
    const [isShowDescription, setIsShowDescription] = useState(false);
    const {
        selectedInsight: { namedPerson },
    } = useSelector(videoDetailsSelector);

    const toggleShowDescription = () => {
        setIsShowDescription(!isShowDescription);
    };

    if (!namedPerson?.description) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-3 items-center">
                    <h5 className="text-mention font-bold text-sm md:text-base">
                        {namedPerson?.name}
                    </h5>
                    <button
                        className="text-xs flex flex-row items-center gap-1"
                        type="button"
                        onClick={toggleShowDescription}
                    >
                        <span className="hidden md:block">
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
                    href={`${constants.GOOGLE_PREFIX}${namedPerson?.name}`}
                >
                    <p className="text-xs bg-black px-2 py-1 border rounded flex items-center gap-2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <span className="hidden md:block">
                            {constants.FIND_ON_GOOGLE}
                        </span>
                    </p>
                </MemoziedRedirectLink>
            </div>
            {isShowDescription && (
                <p className="text-xs">
                    {trimStr(namedPerson?.description, 150)}
                    {namedPerson?.referenceUrl && (
                        <MemoziedRedirectLink
                            href={namedPerson?.referenceUrl}
                            title="Read More"
                            className="font-bold ml-1"
                        />
                    )}
                </p>
            )}
        </div>
    );
};

export default MentionDetails;

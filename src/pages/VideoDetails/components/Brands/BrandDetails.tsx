import React from 'react';
import { useSelector } from 'react-redux';

import { trimStr } from '../../../../common/helpers';
import constants from '../../../../static/constants.json';
import RedirectLink from '../../../../components/RedirectLink';
import { videoDetailsSelector } from '../../../../store/reducers/videoDetails';

const BrandDetails: React.FC = () => {
    const {
        selectedInsight: { brand },
    } = useSelector(videoDetailsSelector);

    return (
        <p className="text-xs">
            {brand?.description ? (
                <>
                    <span>{trimStr(brand?.description, 150)}</span>
                    {brand?.referenceUrl && (
                        <RedirectLink
                            href={brand?.referenceUrl}
                            title="Read More"
                            className="font-bold ml-1"
                        />
                    )}
                </>
            ) : (
                <span>{constants.NO_CONTENT.DESCRIPTION}</span>
            )}
        </p>
    );
};

export default BrandDetails;

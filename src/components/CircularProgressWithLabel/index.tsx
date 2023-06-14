import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';

import './index.css';
import useIsMobile from '../../hooks/useIsMobile';

const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number; color?: string }
) => {
    const isMobile = useIsMobile();

    return (
        <div className="circularProgressWithLabel">
            <CircularProgress
                variant="determinate"
                size={isMobile ? '3rem' : 100}
                {...props}
                sx={{
                    color: props.color ? '' : '#BFED37',
                    borderRadius: '100%',
                    boxShadow: isMobile
                        ? 'inset 0 0 0px 4px gray'
                        : 'inset 0 0 0px 9px gray',
                    backgroundColor: 'transparent',
                }}
            />
            <p className="circularProgressWithLabelPercent">
                {Math.round(props.value)}%
            </p>
        </div>
    );
};

const MemoziedCircularProgressWithLabel = React.memo(CircularProgressWithLabel);
export default MemoziedCircularProgressWithLabel;

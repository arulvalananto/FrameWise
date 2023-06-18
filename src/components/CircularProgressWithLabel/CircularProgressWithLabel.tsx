import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';

import './CircularProgressWithLabel.css';
import useIsMobile from '../../hooks/useIsMobile';

interface CircularProgressWithLabel extends CircularProgressProps {
    issmall?: boolean;
}

const CircularProgressWithLabel = (
    props: CircularProgressWithLabel & {
        value: number;
        color?:
            | 'primary'
            | 'secondary'
            | 'error'
            | 'info'
            | 'success'
            | 'warning'
            | 'inherit';
    }
) => {
    const isMobile = useIsMobile();

    return (
        <div className="circularProgressWithLabel">
            <CircularProgress
                variant="determinate"
                size={isMobile || props.issmall ? '3rem' : 100}
                {...props}
                thickness={3.6}
                color={props.color}
                sx={{
                    color: props.color ? '' : '#BFED37',
                    borderRadius: '100%',
                    boxShadow:
                        isMobile || props.issmall
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

export { MemoziedCircularProgressWithLabel, CircularProgressWithLabel };

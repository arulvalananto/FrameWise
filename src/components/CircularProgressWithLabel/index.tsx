import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import useIsMobile from '../../hooks/useIsMobile';

const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number; color?: string }
) => {
    const isMobile = useIsMobile();

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant="determinate"
                size={isMobile ? '3rem' : 100}
                {...props}
                sx={{
                    color: props.color ? '' : '#BFED37',
                }}
                style={{
                    borderRadius: '100%',
                    boxShadow: isMobile
                        ? 'inset 0 0 0px 4px gray'
                        : 'inset 0 0 0px 9px gray',
                    backgroundColor: 'transparent',
                }}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <p className="text-white text-xs">{Math.round(props.value)}%</p>
            </Box>
        </Box>
    );
};

const MemoziedCircularProgress = React.memo(CircularProgressWithLabel);
export default MemoziedCircularProgress;

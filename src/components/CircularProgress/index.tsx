import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number }
) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
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

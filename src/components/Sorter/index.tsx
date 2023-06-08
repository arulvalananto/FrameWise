import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip, MenuItem, Menu, ListItemIcon } from '@mui/material';

import { AppDispatch } from '../../store';
import { SorterOptionProps } from '../../interfaces/common';
import { changeSortBy, videosSelector } from '../../store/reducers/videos';

const paperStyles = {
    elevation: 0,
    sx: {
        background: '#1A1C1E',
        color: '#ffffff',
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
    },
};

interface SorterProps {
    options: SorterOptionProps[];
}

const Sorter: React.FC<SorterProps> = ({ options }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { sortedBy } = useSelector(videosSelector);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const currentSelectedOption: SorterOptionProps = React.useMemo(
        () => options.find((opt) => opt.value === sortedBy),
        [options, sortedBy]
    );

    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const handleSelect = (val: string): void => {
        dispatch(changeSortBy(val));
        handleClose();
    };

    return (
        <React.Fragment>
            <Tooltip title={currentSelectedOption?.title} arrow>
                <button
                    type="button"
                    onClick={handleClick}
                    aria-label="Upload"
                    className="bg-white text-black px-4 py-2 rounded hover:scale-95 transition-all"
                >
                    <FontAwesomeIcon icon={currentSelectedOption?.icon} />
                </button>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: paperStyles,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {options?.map(({ title, icon, value }) => (
                    <MenuItem key={title} onClick={() => handleSelect(value)}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={icon} color="white" />
                        </ListItemIcon>
                        {title}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
};

const MemoziedSorter = React.memo(Sorter);
export default MemoziedSorter;

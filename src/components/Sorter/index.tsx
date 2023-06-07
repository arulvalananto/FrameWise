import * as React from 'react';
import { useDispatch } from 'react-redux';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip, MenuItem, Menu, ListItemIcon } from '@mui/material';

import { AppDispatch } from '../../store';
import constants from '../../static/constants.json';
import { changeSortBy } from '../../store/reducers/videos';
import { SorterOptionProps } from '../../interfaces/common';

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

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (val: string) => {
        dispatch(changeSortBy(val));
        handleClose();
    };

    return (
        <React.Fragment>
            <Tooltip title={constants.TOOLTIP.SORT_BY} arrow>
                <button
                    type="button"
                    onClick={handleClick}
                    aria-label="Upload"
                    className="bg-white text-black px-4 py-2 rounded hover:scale-95 transition-all"
                >
                    <FontAwesomeIcon icon={faFilter} />
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

export default Sorter;

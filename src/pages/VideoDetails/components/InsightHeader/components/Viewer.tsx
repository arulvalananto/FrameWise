import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    MenuItem,
    Menu,
    Tooltip,
    Checkbox,
    FormControlLabel,
    checkboxClasses,
} from '@mui/material';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppDispatch } from '../../../../../store';
import { paperStyles, viewList } from '../../../../../static/data';
import {
    changeShowInsightState,
    videoDetailsSelector,
} from '../../../../../store/reducers/videoDetails';

const Viewer: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { show } = useSelector(videoDetailsSelector);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const handleSelect = (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ): void => {
        const { name } = event.target;
        if (name) {
            dispatch(changeShowInsightState({ key: name, value: checked }));
        }
    };

    return (
        <React.Fragment>
            <Tooltip title="Change view" arrow placement="top">
                <button
                    onClick={handleClick}
                    type="button"
                    className="flex flex-row items-center gap-2 text-white p-2 font-bold text-xs md:text-sm transition duration-500"
                    aria-label="view"
                >
                    <span>View</span>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`${anchorEl ? 'rotate-180' : ''}`}
                        fontSize={12}
                    />
                </button>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: { ...paperStyles },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {viewList?.map((view) => (
                    <MenuItem key={view}>
                        <FormControlLabel
                            label={
                                view[0].toUpperCase() + view.substring(1) + 's'
                            }
                            control={
                                <Checkbox
                                    name={view}
                                    onChange={handleSelect}
                                    value={show[view]}
                                    checked={show[view]}
                                    size="small"
                                    sx={{
                                        [`&, &.${checkboxClasses.checked}`]: {
                                            color: '#BFED37',
                                        },
                                    }}
                                />
                            }
                        />
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
};

const MemoziedViewer = React.memo(Viewer);
export default MemoziedViewer;

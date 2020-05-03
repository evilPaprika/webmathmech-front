import React, { memo } from 'react';
import { Typography, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/MoreVert';

import { PerformancePost } from 'client/types';
import { useMenu } from 'client/hooks';
import { useStyles } from './styles';


interface Props {
    item: PerformancePost;
}

export const CardInfo = memo(({ item }: Props) => {
    const styles = useStyles();
    const [anchorEl, openMenu, closeMenu] = useMenu();

    return (
        <Box className={styles.blockInfo}>
            <Typography className={styles.date}>
                Создано {new Date(item.createdAt).toLocaleString()}
            </Typography>
            <>
                <IconButton aria-controls="user-menu" size="small" onClick={openMenu}>
                    <SettingsIcon />
                </IconButton>
                <Menu
                    id="user-menu"
                    className={styles.menu}
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    disableScrollLock
                    MenuListProps={{
                        disablePadding: true
                    }}
                    onClose={closeMenu}
                    onClick={closeMenu}
                >
                    <MenuItem>Удалить</MenuItem>
                </Menu>
            </>
        </Box>
    );
});

export default CardInfo;

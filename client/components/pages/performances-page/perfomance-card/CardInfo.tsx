import React, { memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Typography, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/MoreVert';

import { GET_CURRENT_USER } from 'apollo/queries';
import { useMenu, useModal } from 'client/hooks';
import { PerformancePost, Roles, UserData } from 'client/types';
import { PerformancePostModal, RemovePerformancePostModal } from 'components/modals';

import { useStyles } from './styles';


interface Props {
    item: PerformancePost;
}

export const CardInfo = memo(({ item }: Props) => {
    const styles = useStyles();
    const [anchorEl, openMenu, closeMenu] = useMenu();

    const [isOpenRemoveModal, openRemoveModal, closeRemoveModal] = useModal();
    const [isOpenEditModal, openEditModal, closeEditModal] = useModal();

    const { data } = useQuery<UserData>(GET_CURRENT_USER);
    const { role } = data?.getCurrentUser || {};

    return (
        <Box className={styles.blockInfo}>
            <Typography className={styles.date}>
                Создано {new Date(item.createdAt).toLocaleString()}
            </Typography>
            {role === Roles.Admin && (
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
                        <MenuItem onClick={openEditModal}>Редактировать</MenuItem>
                        <MenuItem onClick={openRemoveModal}>Удалить</MenuItem>
                    </Menu>

                    <PerformancePostModal
                        performancePostId={item.id}
                        isOpen={isOpenEditModal}
                        close={closeEditModal}
                    />
                    <RemovePerformancePostModal
                        performancePostId={item.id}
                        isOpen={isOpenRemoveModal}
                        close={closeRemoveModal}
                    />
                </>
            )}
        </Box>
    );
});

export default CardInfo;

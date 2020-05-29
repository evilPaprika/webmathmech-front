import moment from 'moment';
import React, { memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Typography, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/MoreVert';

import { GET_CURRENT_USER } from 'apollo/queries';
import { useMenu, useModal } from 'client/hooks';
import { PerformancePost, Role, UserData } from 'client/types';

import { PerformancePostModal } from '../performance-post-modal';
import { RemovePerformancePostModal } from './remove-performance-post-modal';
import { useStyles } from './styles';


moment.locale('ru');

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
                {moment(item.createdAt).fromNow()}
            </Typography>
            {role === Role.Admin && (
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

                    {isOpenEditModal && (
                        <PerformancePostModal
                            performancePostId={item.id}
                            isOpen={isOpenEditModal}
                            close={closeEditModal}
                        />
                    )}
                    {isOpenRemoveModal && (
                        <RemovePerformancePostModal
                            performancePostId={item.id}
                            isOpen={isOpenRemoveModal}
                            close={closeRemoveModal}
                        />
                    )}
                </>
            )}
        </Box>
    );
});

export default CardInfo;
import { useQuery } from '@apollo/react-hooks';
import { Box, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import React from 'react';

import { GET_CURRENT_USER } from '_apollo/queries';
import { useMenu, useModal } from '_client/hooks';
import { NewsPost, Role, UserData } from '_client/types';
import { NewsPostModal } from '_components/common';

import { RemoveNewsPostModal } from './remove-news-post-modal';
import { useStyles } from './styles';


moment.locale('ru');

interface Props {
    item: NewsPost;
}

export const CardInfo = ({ item }: Props) => {
    const styles = useStyles();
    const [anchorEl, openMenu, closeMenu] = useMenu();
    const [isOpenEditModal, openEditModal, closeEditModal] = useModal();
    const [isOpenRemoveModal, openRemoveModal, closeRemoveModal] = useModal();
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
                        <NewsPostModal
                            newsPostId={item.id}
                            isOpen={isOpenEditModal}
                            close={closeEditModal}
                        />
                    )}
                    {isOpenRemoveModal && (
                        <RemoveNewsPostModal
                            newsPostId={item.id}
                            isOpen={isOpenRemoveModal}
                            close={closeRemoveModal}
                        />
                    )}
                </>
            )}
        </Box>
    );
};

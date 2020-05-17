import React, { memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Box, CardMedia, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/MoreVert';

import { GET_CURRENT_USER } from 'apollo/queries';
import { useMenu, useModal } from 'client/hooks';
import { NewsPost, UserData, Roles } from 'client/types';
import { CardItem } from 'components/common';
import { NewsPostModal, RemoveNewsPostModal } from 'components/modals';
import { useStyles } from './styles';


interface Props {
    item: NewsPost;
}

const CardInfo = ({ item }: Props) => {
    const styles = useStyles();
    const [anchorEl, openMenu, closeMenu] = useMenu();
    const [isOpenEditModal, openEditModal, closeEditModal] = useModal();
    const [isOpenRemoveModal, openRemoveModal, closeRemoveModal] = useModal();
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
                    <NewsPostModal
                        newsPostId={item.id}
                        isOpen={isOpenEditModal}
                        close={closeEditModal}
                    />
                    <RemoveNewsPostModal
                        newsPostId={item.id}
                        isOpen={isOpenRemoveModal}
                        close={closeRemoveModal}
                    />
                </>
            )}
        </Box>
    );
};

const NewsCard = ({ item }: Props) => {
    const styles = useStyles();

    const { description, pictureURL } = item;

    return (
        <CardItem>
            {pictureURL && <CardMedia component="img" className={styles.media} image={pictureURL} />}
            <CardInfo item={item} />
            <Typography className={styles.description}>{description}</Typography>
        </CardItem>
    );
};

export default memo(NewsCard);

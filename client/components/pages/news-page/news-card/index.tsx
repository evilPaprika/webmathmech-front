import React, { memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Box, CardMedia, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/MoreVert';

import { GET_CURRENT_USER } from 'apollo/queries';
import { useMenu, useModal } from 'client/hooks';
import { NewsPost, UserData, Roles } from 'client/types';
import { CardItem } from 'components/common';
import { RemoveNewsPostModal } from 'components/modals';
import { useStyles } from './styles';


interface Props {
    newsPost: NewsPost;
}

const CardInfo = ({ newsPost }: Props) => {
    const styles = useStyles();
    const [anchorEl, openMenu, closeMenu] = useMenu();
    const [isOpenModal, openModal, closeModal] = useModal();
    const { data } = useQuery<UserData>(GET_CURRENT_USER);
    const { role } = data?.getCurrentUser || {};

    return (
        <Box className={styles.blockInfo}>
            <Typography className={styles.date}>
                Создано {new Date(newsPost.createdAt).toLocaleString()}
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
                        <MenuItem onClick={openModal}>Удалить</MenuItem>
                    </Menu>
                    <RemoveNewsPostModal newsPostId={newsPost.id} isOpen={isOpenModal} close={closeModal} />
                </>
            )}
        </Box>
    );
};

const NewsCard = ({ newsPost }: Props) => {
    const styles = useStyles();

    const { text, pictureURL } = newsPost;

    return (
        <CardItem>
            {pictureURL && <CardMedia component="img" className={styles.media} image={pictureURL} />}
            <CardInfo newsPost={newsPost} />
            <Typography className={styles.text}>{text}</Typography>
        </CardItem>
    );
};

export default memo(NewsCard);

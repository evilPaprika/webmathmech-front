import React, { memo } from 'react';
import { Box, CardMedia, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/MoreVert';

import { RemoveNewsPostModal } from 'client/components/modals';
import { useMenu, useModal } from 'client/hooks';
import { NewsPost } from 'client/types';
import CardItem from 'components/common/card-item';
import { useStyles } from './styles';


interface Props {
    newsPost: NewsPost;
}

const CardInfo = ({ newsPost }: Props) => {
    const styles = useStyles();
    const [anchorEl, openMenu, closeMenu] = useMenu();
    const [isOpenModal, openModal, closeModal] = useModal();

    return (
        <Box className={styles.blockInfo}>
            <Typography className={styles.date}>
                Создано {new Date(newsPost.createdAt).toLocaleString()}
            </Typography>
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

import moment from 'moment';
import React, { memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Box, Chip, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/MoreVert';

import { GET_CURRENT_USER } from 'apollo/queries';
import { useMenu, useModal } from 'client/hooks';
import { PerformancePost, Role, UserData } from 'client/types';
import { mapPerformanceState } from 'client/utils';

import { PerformancePostModal } from '../performance-post-modal';
import { RemovePerformancePostModal } from './remove-performance-post-modal';
import { useStyles } from './styles';
import { VotesModal } from './votes-modal';


moment.locale('ru');

interface Props {
    item: PerformancePost;
}

export const CardInfo = memo(({ item }: Props) => {
    const styles = useStyles();
    const [anchorEl, openMenu, closeMenu] = useMenu();

    const [isOpenRemoveModal, openRemoveModal, closeRemoveModal] = useModal();
    const [isOpenEditModal, openEditModal, closeEditModal] = useModal();
    const [isOpenVotesModal, openVotesModal, closeVotesModal] = useModal();

    const { data } = useQuery<UserData>(GET_CURRENT_USER);
    const { role } = data?.getCurrentUser || {};

    return (
        <Box className={styles.blockInfo}>
            <Box>
                <Typography className={styles.date}>
                    {moment(item.createdAt).fromNow()}
                </Typography>
                <Typography>{`${item.speaker?.name || ''} ${item.speaker?.surname || ''}`}</Typography>
            </Box>

            {role === Role.Admin && (
                <Box display="flex" alignItems="center">
                    <Chip label={mapPerformanceState(item.state)} size="small" variant="outlined" />
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
                        <MenuItem onClick={openVotesModal}>Посмотреть голосовавших</MenuItem>
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

                    {isOpenVotesModal && (
                        <VotesModal
                            votes={item?.pollVotes || []}
                            isOpen={isOpenVotesModal}
                            close={closeVotesModal}
                        />
                    )}
                </Box>
            )}
        </Box>
    );
});

export default CardInfo;

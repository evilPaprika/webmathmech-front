import { Box, CardMedia, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '_client/consts';

import logo from './logo.png';
import { useStyles } from './styles';


interface Props {
    onClickByLogo?: () => void;
    onClickByMenu?: () => void;
}

export const HeaderIcons = memo(({ onClickByMenu, onClickByLogo }: Props) => {
    const styles = useStyles();

    return (
        <Box className={styles.icons}>
            <IconButton
                color="inherit"
                edge="start"
                onClick={onClickByMenu}
                className={styles.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <Link to={ROUTES.NEWS} onClick={onClickByLogo}>
                <CardMedia image={logo} className={styles.logo} />
            </Link>
        </Box>
    );
});

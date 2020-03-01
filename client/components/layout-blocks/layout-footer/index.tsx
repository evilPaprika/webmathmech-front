import React, { memo } from 'react';
import { CardMedia, Box, Link, Typography } from '@material-ui/core';

import { FOOTER_LOGOTYPES } from '../../../consts';
import { useStyles } from './styles';


const currentYear = new Date().getFullYear();

const LayoutFooter = () => {
    const styles = useStyles();

    return (
        <Box className={styles.layoutFooter}>
            <Typography variant="body2" color="textPrimary">
                {'Copyright © '}
                <Link color="inherit" href="https://webmathmech.site/" target="_blank">
                    WebMathMech
                </Link>
                {' '}{currentYear}.
            </Typography>
            <Box className={styles.layoutFooter__socialGroup}>
                {FOOTER_LOGOTYPES.map(({ src, href }) => (
                    <Link href={href} target="_blank" className={styles.layoutFooter__socialIcon}>
                        <CardMedia image={src} className={styles.layoutFooter__socialIconImage} />
                    </Link>
                ))}
            </Box>
        </Box>
    );
};

export default memo(LayoutFooter);

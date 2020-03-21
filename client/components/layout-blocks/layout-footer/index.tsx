import React, { memo } from 'react';
import { Box, CardMedia, Container, Link, Typography } from '@material-ui/core';

import { FOOTER_LOGOTYPES } from '../../../consts';
import { useStyles } from './styles';


const currentYear = new Date().getFullYear();

const LayoutFooter = () => {
    const styles = useStyles();

    return (
        <Container className={styles.layoutFooter} maxWidth={false}>
            <Box className={styles.layoutFooter__socialGroup} mb="10px">
                {FOOTER_LOGOTYPES.map(({ src, href }) => (
                    <Link key={src} href={href} target="_blank" className={styles.layoutFooter__socialIcon}>
                        <CardMedia image={src} className={styles.layoutFooter__socialIconImage} />
                    </Link>
                ))}
            </Box>
            <Box textAlign="center">
                <Typography variant="body2" color="textPrimary">
                    {'Copyright by '}
                    <Link color="inherit" href="https://webmathmech.site/" target="_blank">
                    WebMathMech
                    </Link>
                    {' '}{currentYear}.
                </Typography>
            </Box>
        </Container>
    );
};

export default memo(LayoutFooter);

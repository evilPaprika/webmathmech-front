import React, { memo } from 'react';
import { CardMedia, Container, Link, Typography } from '@material-ui/core';

import { FOOTER_LOGOTYPES } from '../../../consts';
import { useStyles } from './styles';


const currentYear = new Date().getFullYear();

const LayoutFooter = () => {
    const styles = useStyles();

    return (
        <Container className={styles.layoutFooter} maxWidth={false}>
            <Container className={styles.layoutFooter__copyright}>
                <Typography variant="body2" color="textPrimary">
                    {'Copyright by '}
                    <Link color="inherit" href="https://webmathmech.site/" target="_blank">
                    WebMathMech
                    </Link>
                    {' '}{currentYear}.
                </Typography>
            </Container>
            <Container className={styles.layoutFooter__socialGroup}>
                {FOOTER_LOGOTYPES.map(({ src, href }) => (
                    <Link key={src} href={href} target="_blank" className={styles.layoutFooter__socialIcon}>
                        <CardMedia image={src} className={styles.layoutFooter__socialIconImage} />
                    </Link>
                ))}
            </Container>
        </Container>
    );
};

export default memo(LayoutFooter);

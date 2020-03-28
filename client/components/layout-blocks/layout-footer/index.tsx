import React, { memo } from 'react';
import { Box, Container, Link, Typography } from '@material-ui/core';

import { CURRENT_YEAR } from 'client/consts';
import LogoVK from './logos/vk_logo.svg';
import LogoMail from './logos/mail_logo.svg';
import LogoGithub from './logos/github_logo.svg';
import { useStyles } from './styles';


const FOOTER_LOGOS = [
    {
        SvgSocialIcon: LogoVK,
        href: 'https://vk.com/webmathmech'
    },
    {
        SvgSocialIcon: LogoMail,
        href: 'mailto:webmathmech@yandex.ru'
    },
    {
        SvgSocialIcon: LogoGithub,
        href: 'https://github.com/evilPaprika/webmathmech-front'
    }
];


const LayoutFooter = () => {
    const styles = useStyles();

    return (
        <Container className={styles.container} maxWidth={false}>
            <Box className={styles.socialGroup} mb="10px">
                {FOOTER_LOGOS.map(({ SvgSocialIcon, href }) => (
                    <Link key={href} href={href} target="_blank" className={styles.socialIcon}>
                        <SvgSocialIcon className={styles.socialIconImage} />
                    </Link>
                ))}
            </Box>
            <Box textAlign="center">
                <Typography variant="body2" color="textPrimary">
                    {'Copyright by '}
                    <Link color="inherit" href="https://webmathmech.site/" target="_blank">
                        WebMathMech
                    </Link>
                    {' '}{CURRENT_YEAR}.
                </Typography>
            </Box>
        </Container>
    );
};

export default memo(LayoutFooter);

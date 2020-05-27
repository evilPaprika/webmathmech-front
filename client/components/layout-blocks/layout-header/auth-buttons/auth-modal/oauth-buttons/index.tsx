import React, { memo } from 'react';
import { Link, Typography } from '@material-ui/core';
import queryString from 'query-string';

// import VkLogo from './oauth-logos/vk-social-network-logo.svg';
// import { useStyles } from './styles';


export const OauthButtons = memo(() => {
    // const styles = useStyles();

    const vkOAuthQuery = queryString.stringify({
        client_id: CONFIG.vkOAuth.clientId,
        display: 'page',
        redirect_uri: CONFIG.vkOAuth.redirectURI,
        response_type: 'code',
        v: CONFIG.vkOAuth.version
    });

    return (
        <>
            <Typography>{'Или войдите с помощью '}
                <Link
                    underline="none"
                    color="secondary"
                    href={`https://oauth.vk.com/authorize?${vkOAuthQuery}`}
                >
                    Вконтакте
                </Link>
            </Typography>
            {/* оставил иконку на будущее, когда будет больше соцсетей, будет смотреться ок */}
            {/* <IconButton */}
            {/*    className={styles.vkOAuth} */}
            {/*    href={`https://oauth.vk.com/authorize?${vkOAuthQuery}`} */}
            {/* > */}
            {/*    <SvgIcon */}
            {/*        component={VkLogo} */}
            {/*        viewBox="0 0 548.358 548.358" */}
            {/*    /> */}
            {/* </IconButton> */}
        </>
    );
});

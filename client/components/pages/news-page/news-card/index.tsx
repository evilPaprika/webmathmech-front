import React, { memo } from 'react';
import { CardMedia, Typography } from '@material-ui/core';

import { NewsPost } from 'client/types';
import { CardItem } from 'components/common';

import { CardInfo } from './CardInfo';
import { useStyles } from './styles';


interface Props {
    item: NewsPost;
}

export const NewsCard = memo(({ item }: Props) => {
    const styles = useStyles();

    const { description, pictureURL } = item;

    return (
        <CardItem>
            {pictureURL && <CardMedia component="img" className={styles.media} image={pictureURL} />}
            <CardInfo item={item} />
            <Typography className={styles.description}>{description}</Typography>
        </CardItem>
    );
});

export default NewsCard;

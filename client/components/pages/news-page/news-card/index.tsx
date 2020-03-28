import React, { memo } from 'react';
import { CardMedia, Typography } from '@material-ui/core';

import { NewsPost } from '../../../../types';
import CardItem from '../../../common/card-item';
import { useStyles } from './styles';


interface Props {
    newsPost: NewsPost;
}

const NewsCard = ({ newsPost }: Props) => {
    const styles = useStyles();

    const { text, pictureURL } = newsPost;

    return (
        <CardItem>
            {pictureURL && <CardMedia component="img" className={styles.media} image={pictureURL} />}
            <Typography className={styles.text}>{text}</Typography>
        </CardItem>
    );
};

export default memo(NewsCard);

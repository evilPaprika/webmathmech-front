import React, { memo } from 'react';
import ReactPlayer from 'react-player';
import { Box, CardMedia } from '@material-ui/core';

import { PerformancePost } from 'client/types';
import CollapsibleText from '../collapsible-text';
import CardItem from '../card-item';

import { CardInfo } from './CardInfo';
import { CardRating } from './CardRating';
import { useStyles } from './styles';


interface Props {
    item: PerformancePost;
}

export const PerformanceCard = memo(({ item }: Props) => {
    const styles = useStyles();

    const { description, pictureURL, videoURL, averageRating } = item;

    return (
        <CardItem>
            {pictureURL && <CardMedia component="img" className={styles.media} image={pictureURL} />}
            {videoURL && <ReactPlayer url={videoURL} width="100%" controls />}
            <CardInfo item={item} />
            <Box className={styles.descriptionContainer}>
                <CollapsibleText text={description} className={styles.description} />
                <CardRating rating={averageRating} />
            </Box>
        </CardItem>
    );
});

export default PerformanceCard;

import React, { memo } from 'react';
import ReactPlayer from 'react-player';
import { Box, CardMedia } from '@material-ui/core';

import { PerformancePost } from 'client/types';
import { CardItem, CollapsibleText } from 'components/common';

import { CardInfo } from './CardInfo';
import { CardRating } from './CardRating';
import { useStyles } from './styles';


interface Props {
    item: PerformancePost;
}

export const PerformanceCard = memo(({ item }: Props) => {
    const styles = useStyles();

    const { text, pictureURL, videoURL, averageRating } = item;

    const isVoted = averageRating.format !== 0 && averageRating.content !== 0 && averageRating.interest !== 0;

    return (
        <CardItem>
            {pictureURL && <CardMedia component="img" className={styles.media} image={pictureURL} />}
            {videoURL && <ReactPlayer url={videoURL} width="100%" controls />}
            <CardInfo item={item} />
            <Box className={styles.description}>
                <CollapsibleText text={text} className={styles.text} />
                {isVoted && <CardRating rating={averageRating} />}
            </Box>
        </CardItem>
    );
});

export default PerformanceCard;

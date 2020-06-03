import { Box, CardMedia, Typography } from '@material-ui/core';
import React, { memo } from 'react';
import ReactPlayer from 'react-player';

import { PerformancePost } from '_client/types';

import CardItem from '../card-item';
import CollapsibleText from '../collapsible-text';
import { ContainerBox } from '../container-box';
import { CardInfo } from './CardInfo';
import { CardRating } from './CardRating';
import { useStyles } from './styles';


interface Props {
    item: PerformancePost;
}

export const PerformanceCard = memo(({ item }: Props) => {
    const styles = useStyles();

    const { description, pictureURL, videoURL } = item;

    return (
        <CardItem>
            {pictureURL && <CardMedia component="img" className={styles.media} image={pictureURL} />}
            {videoURL && <ReactPlayer url={videoURL} width="100%" controls />}
            <CardInfo item={item} />
            <Box className={styles.descriptionContainer} m={2} mt={0}>
                <Box mr={2} mb={2}>
                    <ContainerBox gap="small">
                        <Typography variant="h5">{item.title}</Typography>
                    </ContainerBox>
                    <CollapsibleText variant="body2" text={description} className={styles.description} />
                </Box>
                <CardRating performance={item} />
            </Box>
        </CardItem>
    );
});

export default PerformanceCard;

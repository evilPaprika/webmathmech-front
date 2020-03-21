import React, { memo, useState } from 'react';
import ReactPlayer from 'react-player';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import { useStyles } from './styles';


interface CardProps {
    content: React.ReactNode;
}

const CARDS: Array<CardProps> = [
    {
        content: 'Some content'
    }
];

const NewsPage = () => {
    const styles = useStyles();

    const [rating, setRating] = useState<number | null>(0);

    const changeRating = (_: React.ChangeEvent<{}>, newRating: number | null) => {
        setRating(newRating);
    };

    return (
        <main className={styles.newsPage}>
            <div className={styles.newsPage__main}>
                {/* TODO: перенести в отдельный компонент и заюзать во вкладке Выступления */}
                {CARDS.map(({ content }, index) => (
                    <Card key={index} raised>
                        <CardContent>
                            {/* проверка работы видео */}
                            <ReactPlayer
                                url="https://www.youtube.com/watch?v=_Ht9woqhWmY"
                                controls
                                width={300}
                                height={150}
                            />
                            <Typography style={{ margin: '10px 0' }}>{content}</Typography>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">Рейтинг</Typography>
                                <Rating
                                    name="rating"
                                    value={rating}
                                    onChange={changeRating}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
};

export default memo(NewsPage);

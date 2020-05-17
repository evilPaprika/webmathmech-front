import React, { memo, useState } from 'react';
import ReactPlayer from 'react-player';
import { Box, Container, Card, CardContent, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';


interface Performance {
    content: string;
}

const CARDS: Array<Performance> = [
    {
        content: 'Some content'
    }
];


const PersonalPerformancesPage = () => {
    const [rating, setRating] = useState<number | null>(0);

    const changeRating = (_: React.ChangeEvent<{}>, newRating: number | null) => {
        setRating(newRating);
    };

    return (
        <Container disableGutters>
            <h2>Персональные выступления!!!</h2>
            {CARDS.map(({ content }, index) => (
                <Card key={index} raised>
                    <CardContent>
                        {/* проверка работы видео */}
                        <ReactPlayer
                            url="https://www.youtube.com/watch?v=t2T0Ynr_y-A"
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
        </Container>
    );
};

export default memo(PersonalPerformancesPage);

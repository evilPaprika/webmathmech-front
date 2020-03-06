import React, { memo } from 'react';
import ReactPlayer from 'react-player';
import { Card, CardContent, Typography } from '@material-ui/core';

import { useStyles } from './styles';


interface CardProps {
    header: React.ReactNode;
    content: React.ReactNode;
}

const CARDS: Array<CardProps> = [
    {
        header: 'Header',
        content: 'Some content'
    }
];

const NewsPage = () => {
    const styles = useStyles();

    return (
        <main className={styles.newsPage}>
            <div className={styles.newsPage__main}>
                {/* TODO: перенеести в отдельный компонент и заюзать во вкладке Выступления */}
                {CARDS.map(({ header, content }, index) => (
                    <Card key={index} raised>
                        <Typography variant="h5" style={{ marginTop: '10px' }}>{header}</Typography>
                        <CardContent>
                            {/* проверка работы видео */}
                            <ReactPlayer url="https://www.youtube.com/watch?v=_Ht9woqhWmY" controls />
                            <Typography style={{ margin: '10px 0' }}>{content}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
};

export default memo(NewsPage);

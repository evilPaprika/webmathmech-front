import React, { memo } from 'react';
import ReactPlayer from 'react-player';
import { Card, CardContent, CardHeader } from '@material-ui/core';

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
                <img
                    className={styles.newsPage__logo}
                    src="https://www.meme-arsenal.com/memes/b402fcdafad2034c1cdd9038d6f49a16.jpg"
                    alt="yaml development"
                />
                <p>
                    Site is in progress!
                </p>
                {CARDS.map(({ header, content }) => (
                    <Card>
                        <CardHeader>
                            {header}
                        </CardHeader>
                        <CardContent>
                            {content}
                        </CardContent>
                        {/* проверка работы видео */}
                        <ReactPlayer url="https://www.youtube.com/watch?v=_Ht9woqhWmY" controls />
                    </Card>
                ))}
            </div>
        </main>
    );
};

export default memo(NewsPage);

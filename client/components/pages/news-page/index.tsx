import React, { memo } from 'react';
import ReactPlayer from 'react-player';

import { Card } from '@material-ui/core';
import { useStyles } from './styles';


interface CardProps {
    header: React.ReactNode;
    content: React.ReactNode;
}

const CARDS: Array<CardProps> = [
    {
        header: 'Header',
        content: `abracadabra asofasklfsdl;fksdl;fkls;dfgkl;dsfgksdfksdfslfsdfsdfsdfsd,fsdlvs,vsdlvsdvsv,sdlv;mdfbv
        вамваыи
        ваыив
        аи
        ваыивва
        ив
        аива
        ива
        ивваи
        аиваив
        fsb
        dfbfdb`
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
                {CARDS.map(() => (
                    <Card>
                        {/* <CardHeader>
                            {header}
                        </CardHeader>
                        <CardContent>
                            {content}
                        </CardContent> */}
                        <ReactPlayer url="https://www.youtube.com/watch?v=_Ht9woqhWmY" playing controls />
                        {/* <iframe
                            width="560"
                            height="315"
                            title="hello"
                            src="https://www.youtube.com/watch?v=_Ht9woqhWmY"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        /> */}
                    </Card>
                ))}
            </div>
        </main>
    );
};

export default memo(NewsPage);

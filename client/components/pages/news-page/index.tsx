import React, { memo } from 'react';

import { useStyles } from './styles';


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
            </div>
        </main>
    );
};

export default memo(NewsPage);

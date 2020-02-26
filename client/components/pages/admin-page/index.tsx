import React, { memo } from 'react';

import { useStyles } from './styles';


const NewsPage = () => {
    const styles = useStyles();

    return (
        <main className={styles.adminPage}>
            <div className={styles.adminPage__main}>
                <div>Админка!!!</div>
            </div>
        </main>
    );
};

export default memo(NewsPage);

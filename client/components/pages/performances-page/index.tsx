import React, { memo } from 'react';

import { useStyles } from './styles';


const NewsPage = () => {
    const styles = useStyles();

    return (
        <main className={styles.parformancesPage}>
            <div className={styles.parformancesPage__main}>
                <div>Страница с выступлениями!!!</div>
            </div>
        </main>
    );
};

export default memo(NewsPage);

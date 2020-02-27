import React, { memo } from 'react';

import { useStyles } from './styles';


const PerformancesPage = () => {
    const styles = useStyles();

    return (
        <main className={styles.performancesPage}>
            <div className={styles.performancesPage__main}>
                <div>Страница с выступлениями!!!</div>
            </div>
        </main>
    );
};

export default memo(PerformancesPage);

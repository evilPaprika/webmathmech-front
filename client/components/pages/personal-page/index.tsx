import React, { memo } from 'react';

import { useStyles } from './styles';


const PersonalPage = () => {
    const styles = useStyles();

    return (
        <main className={styles.personalPage}>
            <div className={styles.personalPage__main}>
                <div>Персональная страница пользователя!!!</div>
            </div>
        </main>
    );
};

export default memo(PersonalPage);

import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../consts';
import { useStyles } from './styles';


const LayoutContent = () => {
    const styles = useStyles();

    return (
        <main className={styles.LayoutContent}>
            <div className={styles.LayoutContent__main}>
                <img
                    className={styles.LayoutContent__logo}
                    src="https://www.meme-arsenal.com/memes/b402fcdafad2034c1cdd9038d6f49a16.jpg"
                    alt="yaml development"
                />
                <p>
                    Site is in progress!
                </p>
                <p className={styles.LayoutContent__link}>
                    <Link to={ROUTES.ADMIN_PANEL}>Go to admin panel</Link>
                </p>
            </div>
        </main>
    );
};

export default memo(LayoutContent);

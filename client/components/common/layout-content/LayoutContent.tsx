import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../consts';

import styles from './LayoutContent.css';

const LayoutContent = () => (
    <main className={styles.LayoutContent}>
        <img
            className={styles.ContentLogo}
            src="https://www.meme-arsenal.com/memes/b402fcdafad2034c1cdd9038d6f49a16.jpg"
            alt="yaml development"
        />
        <p>
            Site is in progress!
        </p>
        <p className={styles.ContentLink}>
            <Link to={ROUTES.ADMIN_PANEL}>Go to admin panel</Link>
        </p>
    </main>
);

export default memo(LayoutContent);

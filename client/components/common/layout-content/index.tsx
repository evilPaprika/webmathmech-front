import React, { memo } from 'react';

import { HeaderTabs } from '../../../types';
import { useStyles } from './styles';


interface Props {
    selectedTab?: HeaderTabs;
}

const LayoutContent = ({ selectedTab }: Props) => {
    const styles = useStyles();

    return (
        <main className={styles.LayoutContent}>
            <div className={styles.LayoutContent__main}>
                {selectedTab === HeaderTabs.News && (
                    <>
                        <img
                            className={styles.LayoutContent__logo}
                            src="https://www.meme-arsenal.com/memes/b402fcdafad2034c1cdd9038d6f49a16.jpg"
                            alt="yaml development"
                        />
                        <p>
                            Site is in progress!
                        </p>
                    </>
                )}

                {selectedTab === HeaderTabs.Performances && (
                    <div>Страница с выступлениями!!!</div>
                )}

                {selectedTab === HeaderTabs.Admin && (
                    <div>Админка!!!</div>
                )}
            </div>
        </main>
    );
};

export default memo(LayoutContent);

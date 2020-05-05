import React, { memo } from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { useStyles } from './styles';


interface Props {
    onClick(): void;
}

export const AddEntityIcon = memo(({ onClick }: Props) => {
    const styles = useStyles();

    return (
        <div onClick={onClick} role="presentation" className={styles.icon}>
            <Fab color="secondary" size="medium">
                <AddIcon />
            </Fab>
        </div>
    );
});

export default AddEntityIcon;

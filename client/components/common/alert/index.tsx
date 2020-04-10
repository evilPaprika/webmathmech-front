import React, { memo } from 'react';
import { Alert as MUIAlert } from '@material-ui/lab';

import { useStyles } from './styles';


interface Props {
    onClose(): void;
    text: string;
    severity?: 'success' | 'info' | 'warning' | 'error';
}

const TIME_TO_ALERT_DESTROY_IN_MS = 3000;

const Alert = ({ text, onClose, severity = 'success' }: Props) => {
    const styles = useStyles();

    setTimeout(onClose, TIME_TO_ALERT_DESTROY_IN_MS);

    return (
        <MUIAlert severity={severity} onClose={onClose} className={styles.alert}>
            {text}
        </MUIAlert>
    );
};

export default memo(Alert);

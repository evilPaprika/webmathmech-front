import React, { memo } from 'react';
import { Alert } from '@material-ui/lab';

import { useStyles } from './styles';


interface Props {
    children: React.ReactNode;
    show: boolean;
    onClose(): void;
    text: string;
    severity?: 'success' | 'info' | 'warning' | 'error';
}

export const WithAlert = memo(({ children, show, onClose, text, severity = 'success' }: Props) => {
    const styles = useStyles();

    return (
        <>
            {children}
            {show && (
                <Alert severity={severity} onClose={onClose} className={styles.alert}>
                    {text}
                </Alert>
            )}
        </>
    );
});

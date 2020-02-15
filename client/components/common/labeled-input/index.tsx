import React, { memo } from 'react';
import { Box, Input, InputBaseComponentProps, InputLabel, InputProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type Props = InputBaseComponentProps & InputProps & { label: string; };

const useStyles = makeStyles({
    inputField: {
        display: 'flex',
        alignItems: 'baseline',

        marginBottom: '20px',
    },
    inputLabel: {
        width: '100px'
    },
});

const LabeledInput = ({ label, ...inputProps }: Props) => {
    const styles = useStyles();

    return (
        <Box className={styles.inputField}>
            <InputLabel className={styles.inputLabel}>{label}</InputLabel>
            <Input type="text" {...inputProps} />
        </Box>
    );
};

export default memo(LabeledInput);

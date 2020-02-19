import React, { memo } from 'react';
import { Box, Input, InputBaseComponentProps, InputLabel, InputProps } from '@material-ui/core';

import { useStyles } from './styles';


type Props = InputBaseComponentProps & InputProps & { label: string; };

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

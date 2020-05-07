import React, { memo } from 'react';
import { Box, TextField, Typography } from '@material-ui/core';

import { useStyles } from './styles';


interface Props {
    isEditMode: boolean;
    value: string;
    fontSize?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const CustomTextField = ({ value, onChange, fontSize, placeholder }: Omit<Props, 'isEditMode'>) => {
    const styles = useStyles({ fontSize });

    return (
        <TextField
            defaultValue={value}
            className={styles.textField}
            onChange={onChange}
            placeholder={placeholder}
        >
            {value}
        </TextField>
    );
};

const CustomTypography = ({ value, fontSize }: Omit<Props, 'isEditMode' | 'placeholder' | 'onChange'>) => {
    const styles = useStyles({ fontSize });

    return (
        <Typography
            align="left"
            className={styles.typography}
        >
            {value}
        </Typography>
    );
};


export const EditableField = memo(({
    isEditMode,
    value,
    fontSize = '1rem',
    onChange,
    placeholder = ''
}: Props) => {
    const EditableTag = isEditMode ? CustomTextField : CustomTypography;

    return (
        <Box>
            <EditableTag
                fontSize={fontSize}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
        </Box>
    );
});

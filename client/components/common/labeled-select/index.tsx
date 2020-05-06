import React, { memo } from 'react';
import { FormControl, InputLabel, Select, SelectProps } from '@material-ui/core';


type Props = SelectProps & {label: string};

export const LabeledSelect = memo(({ label, children, fullWidth, ...props }: Props) => (
    <FormControl variant="outlined" size="small" color="secondary" fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select label={label} {...props}>
            {children}
        </Select>
    </FormControl>
));

export default LabeledSelect;

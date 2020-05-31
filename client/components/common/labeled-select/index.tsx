import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete, { AutocompleteProps, RenderInputParams } from '@material-ui/lab/Autocomplete';

import { Option, Options } from 'client/types';


interface OwnProps {
    label: string;
    value: any;
    options?: Options;
    onChange: (value: string) => void;
}

export type Props = Omit<AutocompleteProps<Option>, 'renderInput' | 'options'> & OwnProps;

export const LabeledSelect = ({ label, fullWidth, options, value, onChange, ...props }: Props) => {
    const [state] = useState(value);
    const onChangeInput = (_: React.ChangeEvent<{}>, option: Option | null) => {
        onChange(option?.value || '');
    };

    return (
        <Autocomplete
            options={options || []}
            defaultValue={state}
            renderInput={(params: RenderInputParams) => (
                <TextField {...params} label={label} variant="outlined" fullWidth={fullWidth} />
            )}
            getOptionLabel={(option) => option.label}
            renderOption={(option) => <span>{option.label}</span>}
            onChange={onChangeInput}
            {...props}
        />
    );
};

export default LabeledSelect;

import React, { memo, useState } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete, { AutocompleteProps, RenderInputParams } from '@material-ui/lab/Autocomplete';

import { Option, Options } from 'client/types';


interface OwnProps {
    label: string;
    defaultValue?: Option | null;
    options?: Options;
    onChange: (value: string) => void;
}

export type Props = Omit<AutocompleteProps<Option>, 'renderInput' | 'options'> & OwnProps;

export const AutocompleteSelect = memo(({ label, fullWidth, options, defaultValue, onChange, ...props }: Props) => {
    const [defaultValueCopy] = useState(defaultValue);
    const onChangeInput = (_: React.ChangeEvent<{}>, option: Option | null) => {
        onChange(option?.value || '');
    };

    return (
        <Autocomplete
            openOnFocus
            options={options || []}
            defaultValue={defaultValueCopy || undefined}
            renderInput={(params: RenderInputParams) => (
                <TextField {...params} label={label} variant="outlined" fullWidth={fullWidth} />
            )}
            getOptionLabel={(option) => option.label}
            renderOption={(option) => <span>{option.label}</span>}
            getOptionSelected={(option, value) => option.value === value.value}
            onChange={onChangeInput}
            {...props}
        />
    );
});

export default AutocompleteSelect;

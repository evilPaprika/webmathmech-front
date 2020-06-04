import { TextField } from '@material-ui/core';
import Autocomplete, { AutocompleteProps, RenderInputParams } from '@material-ui/lab/Autocomplete';
import React, { memo, useState } from 'react';

import { Option, Options } from '_client/types';


interface OwnProps {
    label: string;
    defaultValue?: Option | null;
    options?: Options;
    onChange: (value: string) => void;
}

export type Props = Omit<AutocompleteProps<Option>, 'renderInput' | 'options'> & OwnProps;

export const AutocompleteSelect = memo((props: Props) => {
    const { label, fullWidth, options, defaultValue, onChange, size = 'small', ...otherProps } = props;
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
                <TextField {...params} label={label} variant="outlined" size={size} fullWidth={fullWidth} />
            )}
            getOptionLabel={(option) => option.label}
            renderOption={(option) => <span>{option.label}</span>}
            getOptionSelected={(option, value) => option.value === value.value}
            onChange={onChangeInput}
            {...otherProps}
        />
    );
});

export default AutocompleteSelect;

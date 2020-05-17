import React, { memo, useState } from 'react';
import { FormControl, InputAdornment, IconButton, OutlinedTextFieldProps, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { useStyles } from './styles';


enum InputTypes {
    Text = 'text',
    Password = 'password',
}

type Props = Partial<OutlinedTextFieldProps> & { label: string };

const LabeledInput = memo((props: Props) => {
    const { type = InputTypes.Text, color = 'secondary', variant = 'outlined', ...otherProps } = props;
    const styles = useStyles();

    if (type === InputTypes.Password) {
        return <LabeledPasswordInput {...props} />;
    }

    return (
        <FormControl className={styles.inputField}>
            <TextField
                type={type}
                color={color}
                variant={variant}
                {...otherProps}
            />
        </FormControl>
    );
});


export const LabeledPasswordInput = (props: Props) => {
    const styles = useStyles();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const EndAdornment = (
        <InputAdornment position="end">
            <IconButton
                onClick={onClickShowPassword}
                edge="end"
            >
                {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </InputAdornment>
    );

    return (
        <FormControl className={styles.inputField}>
            <TextField
                color="secondary"
                variant="outlined"
                InputProps={{
                    endAdornment: EndAdornment
                }}
                {...props}
                type={showPassword ? InputTypes.Text : InputTypes.Password}
            />
        </FormControl>
    );
};

export default LabeledInput;

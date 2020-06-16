import { useMutation } from '@apollo/react-hooks';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { memo } from 'react';

import { PATCH_USER } from '_apollo/mutations';
import { FIND_USER } from '_apollo/queries';
import { Role } from '_client/types';
import { LoadingWrapper } from '_components/common';
import { SnackbarErrorText } from '_components/common/snackbar-error-text';


interface Props {
    id: string;
    defaultValue: Role;
}

export const UserRoleSelect = memo(({ id, defaultValue }: Props) => {
    const { enqueueSnackbar } = useSnackbar();

    const [patchUser, { loading }] = useMutation(
        PATCH_USER,
        {
            update: (dataProxy, mutationResult) => {
                dataProxy.writeQuery({
                    query: FIND_USER,
                    data: {
                        findUser: mutationResult.data.patchUser
                    },
                    variables: { login: mutationResult.data.patchUser.login }
                });
            },
            onCompleted() {
                enqueueSnackbar('Роль успешно изменена!', { variant: 'success' });
            },
            onError(error: ApolloError) {
                const title = 'Произошла ошибка при измененении роли';

                enqueueSnackbar(<SnackbarErrorText title={title} error={error} />, { variant: 'error' });
            }
        },
    );


    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const variables = { id, role: event.target.value };
        patchUser({ variables });
    };

    return (
        <LoadingWrapper loading={loading}>
            <FormControl variant="outlined" size="small">
                <Select
                    defaultValue={defaultValue}
                    onChange={handleChange}
                >
                    { Object.values(Role).map((role) => <MenuItem key={role} value={role}>{role}</MenuItem>)}
                </Select>
            </FormControl>
        </LoadingWrapper>
    );
});

export default UserRoleSelect;

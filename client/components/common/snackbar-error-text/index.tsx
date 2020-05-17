import { ApolloError } from 'apollo-client';
import React, { memo, useMemo } from 'react';
import { getErrors } from 'client/utils';
import { Box } from '@material-ui/core';


interface Props {
    title: string;
    error: ApolloError;
}

export const SnackbarErrorText = memo(({ title, error }: Props) => {
    const errors = useMemo(() => getErrors(error), [error]);

    return (
        <Box>
            <Box fontWeight="bold">{title}</Box>
            {errors?.map((err, index) => <Box key={index}>{err}</Box>)}
        </Box>
    );
});

export default SnackbarErrorText;

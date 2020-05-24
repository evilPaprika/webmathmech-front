import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { createContext, Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { PATCH_CURRENT_USER } from 'apollo/mutations';
import { GET_CURRENT_USER } from 'apollo/queries';
import { User, UserData } from 'client/typings';
import { SnackbarErrorText } from 'components/common';


interface IPersonalPageContext {
    user?: User;
    isEditMode: boolean;
    toggleEditMode: () => void;
    userStates: {
        surname: [string | undefined, Dispatch<SetStateAction<string | undefined>>];
        name: [string | undefined, Dispatch<SetStateAction<string | undefined>>];
    };
    submitNewUserStates: () => void;
    loading: boolean;
}

export const PersonalPageContext = createContext<IPersonalPageContext>({} as IPersonalPageContext);

export const PersonalPageContextProvider = ({ children }: {children: ReactElement}) => {
    const { enqueueSnackbar } = useSnackbar();

    const onError = (error: ApolloError) => {
        const title = 'Произошла ошибка, попробуйте еще раз';
        enqueueSnackbar(<SnackbarErrorText title={title} error={error} />, { variant: 'error' });
    };

    const { data, loading } = useQuery<UserData>(GET_CURRENT_USER, { onError });

    const [patchCurrentUser, { loading: patchLoading }] = useMutation(PATCH_CURRENT_USER, {
        refetchQueries: [{ query: GET_CURRENT_USER }],
        awaitRefetchQueries: true,
        onError
    });

    const user = data?.getCurrentUser;

    const [isEditMode, setIsEditMode] = useState(false);
    const [surname, setSurname] = useState(user?.surname);
    const [name, setName] = useState(user?.name);

    useEffect(() => {
        setSurname(user?.surname);
        setName(user?.name);
    }, [data, loading, patchLoading]);

    const toggleEditMode = useCallback(() => {
        setSurname(user?.surname);
        setName(user?.name);
        setIsEditMode(!isEditMode);
    }, [user?.surname, user?.name, isEditMode]);

    const submitNewUserStates = useCallback(async () => {
        await patchCurrentUser({
            variables: { surname, name }
        });
        setIsEditMode(!isEditMode);
    }, [surname, name, toggleEditMode]);

    const newUserStates: IPersonalPageContext['userStates'] = {
        surname: [surname, setSurname],
        name: [name, setName]
    };

    return (
        <PersonalPageContext.Provider
            value={{
                user,
                isEditMode,
                toggleEditMode,
                userStates: newUserStates,
                submitNewUserStates,
                loading: loading || patchLoading
            }}
        >
            {children}
        </PersonalPageContext.Provider>
    );
};

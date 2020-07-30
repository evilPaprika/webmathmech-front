import { useMutation, useQuery } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { createContext, Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useState } from 'react';

import { PATCH_CURRENT_USER } from '_apollo/mutations';
import { GET_CURRENT_USER } from '_apollo/queries';
import { MutationPatchCurrentUserArgs, User, UserData } from '_client/types';
import { SnackbarErrorText } from '_components/common';


type MayBeString = string | undefined;

interface IPersonalPageContext {
    user?: User;
    isEditMode: boolean;
    toggleEditMode: () => void;
    userStates: {
        surname: [string, Dispatch<SetStateAction<string>>];
        name: [string, Dispatch<SetStateAction<string>>];
        universityGroup: [MayBeString, Dispatch<SetStateAction<MayBeString>>];
    };
    submitNewUserStates: () => void;
    loading: boolean;
}

const CONTEXT_VALUE_DEFAULT = {} as IPersonalPageContext;

export const PersonalPageContext = createContext<IPersonalPageContext>(CONTEXT_VALUE_DEFAULT);

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
    const [surname, setSurname] = useState<string>(user?.surname || '');
    const [name, setName] = useState<string>(user?.name || '');
    const [group, setGroup] = useState<MayBeString>(user?.universityGroup || '');

    const setState = () => {
        setSurname(user?.surname || '');
        setName(user?.name || '');
        setGroup(user?.universityGroup || '');
    };

    useEffect(() => {
        setState();
    }, [data, loading, patchLoading]);

    const toggleEditMode = useCallback(() => {
        setState();
        setIsEditMode(!isEditMode);
    }, [user, isEditMode]);

    const submitNewUserStates = useCallback(async () => {
        const variables: MutationPatchCurrentUserArgs = { surname, name, universityGroup: group };

        await patchCurrentUser({ variables });
        setIsEditMode(!isEditMode);
    }, [surname, name, group, toggleEditMode]);

    const newUserStates: IPersonalPageContext['userStates'] = {
        surname: [surname, setSurname],
        name: [name, setName],
        universityGroup: [group, setGroup]
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

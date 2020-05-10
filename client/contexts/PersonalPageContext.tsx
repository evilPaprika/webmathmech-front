import React, { Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useState, createContext } from 'react';
import { User, UserData } from 'client/types';
import { GET_CURRENT_USER } from 'apollo/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { PATCH_CURRENT_USER } from 'apollo/mutations';
import { useSnackbar } from 'notistack';


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
    const { data, loading, error } = useQuery<UserData>(GET_CURRENT_USER);
    const [patchCurrentUser, { error: patchError, loading: patchLoading }] = useMutation(PATCH_CURRENT_USER, {
        refetchQueries: [{ query: GET_CURRENT_USER }],
        awaitRefetchQueries: true,
    });

    const user = data?.getCurrentUser;

    const [isEditMode, setIsEditMode] = useState(false);
    const [surname, setSurname] = useState(user?.surname);
    const [name, setName] = useState(user?.name);

    useEffect(() => {
        setSurname(user?.surname);
        setName(user?.name);
    }, [data, loading, error]);

    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (patchError || error) {
            enqueueSnackbar('Произошла ошибка, попробуйте еще раз', { variant: 'error' });
        }
    }, [patchError, error]);

    const toggleEditMode = useCallback(() => {
        setSurname(user?.surname);
        setName(user?.name);
        setIsEditMode(!isEditMode);
    }, [user?.surname, user?.name, isEditMode]);

    const submitNewUserStates = useCallback(async () => {
        await patchCurrentUser({
            variables: { surname, name }
        });
        toggleEditMode();
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

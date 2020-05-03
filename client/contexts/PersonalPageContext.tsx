import React, { Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useState } from 'react';
import { User, UserData } from 'client/types';
import { GET_CURRENT_USER } from 'apollo/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { PATCH_CURRENT_USER } from 'apollo/mutations';
import { useSnackbar } from 'notistack';


interface IPersonalPageContext {
    user?: User;
    isEditMode: boolean;
    toggleEditMode: () => void;
    newUserStates: {
        newSurname: [string| undefined, Dispatch<SetStateAction<string | undefined>>];
        newName: [string| undefined, Dispatch<SetStateAction<string | undefined>>];
    };
    submitNewUserStates: () => void;
}

export const PersonalPageContext = React.createContext < IPersonalPageContext >({} as IPersonalPageContext);

export const PersonalPageContextProvider = ({ children }: {children: ReactElement}) => {
    const { data, refetch, loading, error } = useQuery<UserData>(GET_CURRENT_USER);
    const [patchCurrentUser, { error: patchError }] = useMutation(PATCH_CURRENT_USER, {
        async onCompleted() {
            await refetch();
        }
    });

    const user = data?.getCurrentUser;

    const [isEditMode, setIsEditMode] = useState(false);
    const [newSurname, setNewSurname] = useState<string | undefined>(user?.surname);
    const [newName, setNewName] = useState(user?.name);

    useEffect(() => {
        setNewSurname(user?.surname);
        setNewName(user?.name);
    }, [data, loading, error]);

    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (patchError || error) {
            enqueueSnackbar('Произошла ошибка, попробуйте еще раз', { variant: 'error' });
        }
    }, [patchError, error]);

    const toggleEditMode = useCallback(() => {
        setNewSurname(user?.surname);
        setNewName(user?.name);
        setIsEditMode(!isEditMode);
    }, [user?.surname, user?.name, isEditMode]);

    const submitNewUserStates = useCallback(async () => {
        await patchCurrentUser({
            variables: { surname: newSurname, name: newName }
        });
        toggleEditMode();
    }, [newSurname, newName, toggleEditMode]);

    const newUserStates: IPersonalPageContext['newUserStates'] = {
        newSurname: [newSurname, setNewSurname],
        newName: [newName, setNewName]
    };

    return (
        <PersonalPageContext.Provider value={{ user, isEditMode, toggleEditMode, newUserStates, submitNewUserStates }}>
            {children}
        </PersonalPageContext.Provider>
    );
};

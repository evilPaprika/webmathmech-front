import React, { ChangeEvent, memo, useContext } from 'react';
import { Box, Chip, CircularProgress } from '@material-ui/core';

import { PersonalPageContext, PersonalPageContextProvider } from 'client/contexts/PersonalPageContext';
import { EditModeButtons } from 'components/pages/personal-page/edit-mode-buttons';
import { EditableField } from 'components/pages/personal-page/editable-field';


const PersonalPage = memo(() => {
    const { isEditMode, user, userStates, loading } = useContext(PersonalPageContext);
    const [surname, setSurname] = userStates.surname;
    const [name, setName] = userStates.name;

    const onChangeSurname = (event: ChangeEvent<HTMLInputElement>) => setSurname(event.target.value);
    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);

    return (
        <main>
            {loading || !user ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <EditableField
                        isEditMode={isEditMode}
                        fontSize="40px"
                        onChange={onChangeSurname}
                        value={surname || ''}
                        placeholder="Фамилия"
                    />
                    <EditableField
                        isEditMode={isEditMode}
                        fontSize="40px"
                        onChange={onChangeName}
                        value={name || ''}
                        placeholder="Имя"
                    />
                    <Box mt={1}>
                        <Chip
                            size="small"
                            label={user.role}
                            color="primary"
                        />
                        <Box mt={2}>Логин: {user.login}</Box>
                    </Box>
                    <Box mt={8}>
                        <EditModeButtons />
                    </Box>
                </>
            )}
        </main>
    );
});

export default () => (
    <PersonalPageContextProvider>
        <PersonalPage />
    </PersonalPageContextProvider>
);

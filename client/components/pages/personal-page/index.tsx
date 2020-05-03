import React, { memo, useContext } from 'react';
import { Box, Chip } from '@material-ui/core';

import { PersonalPageContext, PersonalPageContextProvider } from 'client/contexts/PersonalPageContext';
import { EditModeButtons } from 'components/pages/personal-page/edit-mode-buttons';
import { EditableField } from 'components/pages/personal-page/editable-field';


const PersonalPage = memo(() => {
    const { isEditMode, user, newUserStates } = useContext(PersonalPageContext);
    const [newSurname, setNewSurname] = newUserStates.newSurname;
    const [newName, setNewName] = newUserStates.newName;

    return (
        <main>
            <EditableField
                isEditMode={isEditMode}
                fontSize="40px"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewSurname(event.target.value)}
                value={newSurname}
                placeholder="Фамилия"
            />
            <EditableField
                isEditMode={isEditMode}
                fontSize="40px"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewName(event.target.value)}
                value={newName}
                placeholder="Имя"
            />
            <Box mt={1}>
                <Chip
                    size="small"
                    label={user?.role}
                    color="primary"
                />
                <Box mt={2}>Логин: {user?.login}</Box>
            </Box>
            <Box mt={8}>
                <EditModeButtons />
            </Box>
        </main>
    );
});

export default () => <PersonalPageContextProvider><PersonalPage /></PersonalPageContextProvider>;

import React, { ChangeEvent, memo, useContext } from 'react';
import { Box, Chip } from '@material-ui/core';

import { PersonalPageContext, PersonalPageContextProvider } from 'client/contexts/PersonalPageContext';
import { LoadingWrapper } from 'components/common';

import { EditModeButtons } from './edit-mode-buttons';
import { EditableField } from './editable-field';


const PersonalPage = memo(() => {
    const { isEditMode, user, userStates, loading } = useContext(PersonalPageContext);
    const [surname, setSurname] = userStates.surname;
    const [name, setName] = userStates.name;

    const onChangeSurname = (event: ChangeEvent<HTMLInputElement>) => setSurname(event.target.value);
    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);

    return (
        <main>
            <LoadingWrapper loading={loading || !user}>
                {user && (
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
            </LoadingWrapper>
        </main>
    );
});

export default () => (
    <PersonalPageContextProvider>
        <PersonalPage />
    </PersonalPageContextProvider>
);

import { Chip } from '@material-ui/core';
import React, { ChangeEvent, memo, useContext } from 'react';

import { PersonalPageContext, PersonalPageContextProvider } from '_client/contexts/PersonalPage.context';
import { CardItem, ContainerBox, LabeledBox, LoadingWrapper, PageContainer } from '_components/common';

import { EditModeButtons } from './edit-mode-buttons';
import { EditableField } from './editable-field';


const PersonalPage = memo(() => {
    const { isEditMode, user, userStates, loading } = useContext(PersonalPageContext);
    const [surname, setSurname] = userStates.surname;
    const [name, setName] = userStates.name;
    const [group, setGroup] = userStates.universityGroup;

    const onChangeSurname = (event: ChangeEvent<HTMLInputElement>) => setSurname(event.target.value);
    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    const onChangeGroup = (event: ChangeEvent<HTMLInputElement>) => setGroup(event.target.value);

    return (
        <PageContainer>
            <CardItem>
                <ContainerBox m="20px 40px">
                    <LoadingWrapper loading={loading}>
                        {user && (
                            <>
                                <ContainerBox>
                                    <EditableField
                                        value={name}
                                        isEditMode={isEditMode}
                                        fontSize="40px"
                                        placeholder="Имя"
                                        onChange={onChangeName}
                                    />
                                    <EditableField
                                        value={surname}
                                        isEditMode={isEditMode}
                                        fontSize="40px"
                                        placeholder="Фамилия"
                                        onChange={onChangeSurname}
                                    />
                                </ContainerBox>
                                <ContainerBox>
                                    <Chip label={user.role} size="small" color="primary" />
                                </ContainerBox>
                                <LabeledBox label="Логин">{user.login}</LabeledBox>
                                <LabeledBox label="Группа" gap="extra">
                                    {isEditMode
                                        ? (
                                            <EditableField
                                                value={group || ''}
                                                isEditMode={isEditMode}
                                                onChange={onChangeGroup}
                                            />
                                        )
                                        : user.universityGroup || '-'}
                                </LabeledBox>
                                <ContainerBox>
                                    <EditModeButtons />
                                </ContainerBox>
                            </>
                        )}
                    </LoadingWrapper>
                </ContainerBox>
            </CardItem>
        </PageContainer>
    );
});

export default () => (
    <PersonalPageContextProvider>
        <PersonalPage />
    </PersonalPageContextProvider>
);

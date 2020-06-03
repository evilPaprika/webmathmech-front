import { Button, ButtonGroup } from '@material-ui/core';
import { Cancel as CancelIcon, Edit as EditIcon, Save as SaveIcon } from '@material-ui/icons';
import React, { memo, useContext } from 'react';

import { PersonalPageContext } from '_contexts/PersonalPageContext';


export const EditModeButtons = memo(() => {
    const { isEditMode, toggleEditMode, submitNewUserStates } = useContext(PersonalPageContext);

    return (
        <ButtonGroup
            variant="outlined"
            color="secondary"
            size="small"
        >
            {isEditMode
                ? (
                    [
                        <Button
                            key={1}
                            startIcon={<CancelIcon />}
                            onClick={toggleEditMode}
                        >
                            Отменить
                        </Button>,
                        <Button
                            key={2}
                            startIcon={<SaveIcon />}
                            onClick={submitNewUserStates}
                        >
                            Сохранить
                        </Button>
                    ]
                ) : (
                    <Button
                        startIcon={<EditIcon />}
                        onClick={toggleEditMode}
                    >
                        Изменить
                    </Button>
                )}
        </ButtonGroup>
    );
});

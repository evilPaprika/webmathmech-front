import React, { memo } from 'react';
import { Container } from '@material-ui/core';

const Error404 = () => {
    return (
        <Container>
            Запрашиваемая вами страница не найдена!
        </Container>
    );
};

export default memo(Error404);

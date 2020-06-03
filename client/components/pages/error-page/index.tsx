import { Container } from '@material-ui/core';
import React, { memo } from 'react';


const Error404 = () => {
    return (
        <Container>
            Запрашиваемая вами страница не найдена!
        </Container>
    );
};

export default memo(Error404);

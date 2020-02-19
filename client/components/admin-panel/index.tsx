import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../consts';


const AdminPanel = () => {
    return (
        <>
            <div>This is admin panel!!!</div>
            <Link to={ROUTES.MAIN}>Go back!</Link>
        </>
    );
};

export default memo(AdminPanel);

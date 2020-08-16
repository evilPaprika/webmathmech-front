import React, { createContext, ReactElement } from 'react';

import { QueryGetNewsPostsCursorArgs } from '_client/types';


interface IPerformanceListContext {
    sequelizeWhere?: QueryGetNewsPostsCursorArgs['sequelizeWhere'];
}

interface Props {
    children: ReactElement;
    sequelizeWhere?: QueryGetNewsPostsCursorArgs['sequelizeWhere'];
}

const CONTEXT_VALUE_DEFAULT = {};

export const PerformanceListContext = createContext<IPerformanceListContext>(CONTEXT_VALUE_DEFAULT);

export const PerformanceListContextProvider = ({ children, sequelizeWhere }: Props) => {
    return (
        <PerformanceListContext.Provider value={{ sequelizeWhere }}>
            {children}
        </PerformanceListContext.Provider>
    );
};

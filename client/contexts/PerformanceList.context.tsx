import React, { createContext, ReactElement } from 'react';

import { QueryGetNewsPostsCursorArgs } from '_client/types';


interface IPerformanceListContext {
    sequelizeWhere?: QueryGetNewsPostsCursorArgs['sequelizeWhere'];
}

interface Props {
    children: ReactElement;
    sequelizeWhere?: QueryGetNewsPostsCursorArgs['sequelizeWhere'];
}

export const PerformanceListContext = createContext<IPerformanceListContext>({} as IPerformanceListContext);

export const PerformanceListContextProvider = ({ children, sequelizeWhere }: Props) => {
    return (
        <PerformanceListContext.Provider value={{ sequelizeWhere }}>
            {children}
        </PerformanceListContext.Provider>
    );
};

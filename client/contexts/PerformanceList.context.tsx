import React, { createContext, ReactElement } from 'react';

import { PerformancePaginationFiltersInput } from '_client/types';


interface IPerformanceListContext {
    filters?: PerformancePaginationFiltersInput;
}

interface Props {
    children: ReactElement;
    filters?: PerformancePaginationFiltersInput;
}

const CONTEXT_VALUE_DEFAULT = {};

export const PerformanceListContext = createContext<IPerformanceListContext>(CONTEXT_VALUE_DEFAULT);

export const PerformanceListContextProvider = ({ children, filters }: Props) => {
    return (
        <PerformanceListContext.Provider value={{ filters }}>
            {children}
        </PerformanceListContext.Provider>
    );
};

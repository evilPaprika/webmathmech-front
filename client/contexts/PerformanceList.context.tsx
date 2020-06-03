import React, { createContext, ReactElement } from 'react';

import { PerformancePaginationFiltersInput } from '_client/types';


interface IPerformanceListContext {
    filters?: PerformancePaginationFiltersInput;
}

interface Props {
    children: ReactElement;
    filters?: PerformancePaginationFiltersInput;
}

export const PerformanceListContext = createContext<IPerformanceListContext>({} as IPerformanceListContext);

export const PerformanceListContextProvider = ({ children, filters }: Props) => {
    return (
        <PerformanceListContext.Provider value={{ filters }}>
            {children}
        </PerformanceListContext.Provider>
    );
};

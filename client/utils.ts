import { ApolloError } from 'apollo-client';

import { Option, Options } from './types';


const PATH_REGEXP = /^(\/[\w-]+)/;

export const findMenuItemByPath = (menuItems: Options, pathname: string): Option | undefined => {
    const tabName = PATH_REGEXP.exec(pathname)?.[1];

    return menuItems.find(({ value }) => tabName === value);
};

export const truncateText = (text: string, length: number): string => `${text.slice(0, length - 2)}...`;

interface ValidationError {
    constraints?: {
        [x: string]: string;
    };
}

export const getErrors = (error: ApolloError): Array<string> | null => {
    if (!error) {
        return null;
    }

    const validationErrors: ValidationError[] = error.graphQLErrors[0].extensions?.exception.validationErrors;

    if (!validationErrors) {
        return [error.message];
    }

    return validationErrors.map(({ constraints = {} }) => Object
        .values(constraints)
        .join('\n'));
};

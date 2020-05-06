import { Option, Options } from './types';


const PATH_REGEXP = /^(\/[\w-]+)/;

export const findMenuItemByPath = (menuItems: Options, pathname: string): Option | undefined => {
    const tabName = PATH_REGEXP.exec(pathname)?.[1];

    return menuItems.find(({ value }) => tabName === value);
};

export const truncateText = (text: string, length: number): string => `${text.slice(0, length - 2)}...`;

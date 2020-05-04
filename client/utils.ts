import { MenuItem } from './types';


const PATH_REGEXP = /^(\/[\w-]+)/;

export const findMenuItemByPath = (menuItems: Array<MenuItem>, pathname: string): MenuItem | undefined => {
    const tabName = PATH_REGEXP.exec(pathname)?.[1];

    return menuItems.find(({ path }) => tabName === path);
};

export const truncateText = (text: string, length: number): string => `${text.slice(0, length - 2)}...`;

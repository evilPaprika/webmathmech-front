import { useState } from 'react';


export const useModal = (defaultIsOpened: boolean = false): [boolean, () => void, () => void] => {
    const [isOpened, setIsOpened] = useState<boolean>(defaultIsOpened);

    const open = () => {
        setIsOpened(true);
    };

    const close = () => {
        setIsOpened(false);
    };

    return [isOpened, open, close];
};

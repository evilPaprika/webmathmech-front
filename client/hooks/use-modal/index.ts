import { useState } from 'react';


export const useModal = (defaultOpened: boolean = false): [boolean, () => void, () => void] => {
    const [opened, setOpened] = useState<boolean>(defaultOpened);

    const open = () => {
        setOpened(true);
    };

    const close = () => {
        setOpened(false);
    };

    return [opened, open, close];
};

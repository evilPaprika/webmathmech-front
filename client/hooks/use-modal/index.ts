import { useState } from 'react';


export const useModal = (defaultIsOpen: boolean = false): [boolean, () => void, () => void] => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);

    const open = () => {
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
    };

    return [isOpen, open, close];
};

import { useState } from 'react';


type UseModalReturnType = [
    boolean,
    () => void,
    () => void
];

export const useModal = (defaultIsOpen: boolean = false): UseModalReturnType => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);

    const open = () => {
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
    };

    return [isOpen, open, close];
};

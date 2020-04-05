import React, { useState } from 'react';


type AnchorType = HTMLElement | null;
type UseMenuReturnType = [
    AnchorType,
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    () => void
];

export const useMenu = (defaultAnchor: AnchorType = null): UseMenuReturnType => {
    const [anchorEl, setAnchorEl] = useState<AnchorType>(defaultAnchor);

    const openMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    return [anchorEl, openMenu, closeMenu];
};

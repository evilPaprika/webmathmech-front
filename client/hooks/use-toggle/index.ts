import { useState } from 'react';


type UseToggleReturnType = [boolean, () => void];

export const useToggle = (initialState: boolean = false): UseToggleReturnType => {
    const [toggled, setToggled] = useState<boolean>(initialState);

    const onToggle = () => {
        setToggled(!toggled);
    };

    return [toggled, onToggle];
};

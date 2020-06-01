import { useState } from 'react';


type UseToggleReturnType = [boolean, (value?: boolean) => void];

export const useToggle = (initialState: boolean = false): UseToggleReturnType => {
    const [toggled, setToggled] = useState<boolean>(initialState);

    const onToggle = (value?: boolean) => {
        setToggled(value || !toggled);
    };

    return [toggled, onToggle];
};

import React, { memo } from 'react';

import { PerformancePostState } from '_client/types';
import { Modal, PerformancesList } from '_components/common';


interface Props {
    isOpen: boolean;
    close(): void;
    refetch(): void;
}

export const ActivePollsModal = memo(({ isOpen, close, refetch }: Props) => {
    const onClose = () => {
        refetch();
        close();
    };

    return (
        <Modal title="Активные голосования" isOpen={isOpen} close={onClose}>
            <PerformancesList filters={{ states: [PerformancePostState.Poll] }} />
        </Modal>
    );
});

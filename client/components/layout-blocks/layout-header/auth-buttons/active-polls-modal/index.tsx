import React, { memo } from 'react';

import { PerformancePostState } from '_client/types';
import { Modal, PerformancesList } from '_components/common';


interface Props {
    isOpen: boolean;
    close(): void;
}

export const ActivePollsModal = memo(({ isOpen, close }: Props) => (
    <Modal title="Активные голосования" isOpen={isOpen} maxWidth="md" close={close}>
        <PerformancesList sequelizeWhere={{ state: [PerformancePostState.Poll] }} />
    </Modal>
));

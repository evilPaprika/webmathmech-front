import { registerEnumType } from 'type-graphql';


export enum Role {
    USER = 'USER',
    STUDENT = 'STUDENT',
    ADMIN = 'ADMIN',
}

registerEnumType(Role, {
    name: 'Role',
});


export enum PerformancePostState {
    DRAFT = 'DRAFT',
    POLL = 'POLL',
    PUBLISHED = 'PUBLISHED',
}

registerEnumType(PerformancePostState, {
    name: 'PerformancePostState',
});

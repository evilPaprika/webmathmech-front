import { registerEnumType } from 'type-graphql';


export enum Role {
    USER = 'USER',
    STUDENT = 'STUDENT',
    ADMIN = 'ADMIN',
}

registerEnumType(Role, {
    name: 'Role',
    description: 'User role',
});

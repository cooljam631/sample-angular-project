import { Person } from './person';
export interface Role {
    id: number;
    roleName: RoleEnum;
    persons: Person[];
}

export enum RoleEnum{
    ADMIN = 'ADMIN',
    DEV = 'DEV',
    QA = 'QA',
    BA = 'BA'
}

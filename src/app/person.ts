import { Role } from './role';
export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    suffix: string;
    title: string;
    streetNo: string;
    barangay: string;
    city: string;
    zipCode: string;
    birthday: Date;
    gwa: string;
    dateHired: Date;
    currentlyEmployed: boolean;
    landline: string;
    mobileNumber: string;
    email: string;
    roles: Set<Role>;
    roleIds: Set<number>;
    deleted: boolean;
}

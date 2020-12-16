import { AccountTypes } from '../enum/types';

export interface User {
    userId: string;
    name: string;
    birthday?: Date;
    type: AccountTypes;
}

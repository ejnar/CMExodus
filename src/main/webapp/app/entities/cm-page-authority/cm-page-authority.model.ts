import { BaseEntity } from './../../shared';

export class CmPageAuthority implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: number,
        public user?: string,
        public role?: string,
        public cmPageId?: number,
    ) {
    }
}

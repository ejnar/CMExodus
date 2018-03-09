import { BaseEntity } from './../../shared';

export class CmPageAuthorityCm implements BaseEntity {
    constructor(
        public id?: number,
        public user?: string,
        public role?: string,
        public cmPageId?: number,
    ) {
    }
}

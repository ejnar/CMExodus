import { BaseEntity } from './../../shared';

export const enum PageLayout {
    'MAIN',
    'COLUMN'
}

export class CmPageCm implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public metaTitle?: string,
        public metaDescription?: string,
        public sort?: number,
        public layout?: PageLayout,
        public authorities?: BaseEntity[],
        public modules?: BaseEntity[],
    ) {
    }
}

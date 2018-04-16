import { BaseEntity } from './../../shared';

export const enum PageLayout {
    'MAIN',
    'COLUMN_RIGHT'
}

export class CmPageCm implements BaseEntity {
    constructor(
        public id?: number,
        public titleSv?: string,
        public titleEn?: string,
        public metaTitle?: string,
        public metaDescription?: string,
        public sorted?: number,
        public pageLayout?: PageLayout,
        public authorities?: BaseEntity[],
        public modules?: BaseEntity[],
    ) {
    }
}

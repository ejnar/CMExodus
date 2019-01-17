import { BaseEntity } from './../../shared';
import { CmModule } from './../cm-module';

export const enum PageLayout {
    'MAIN',
    'COLUMN_RIGHT'
}

export class CmPage implements BaseEntity {
    constructor(
        public id?: number,
        public titleSv?: string,
        public titleEn?: string,
        public metaTitle?: string,
        public metaDescription?: string,
        public sorted?: number,
        public publishDate?: any,
        public publish?: boolean,
        public pageLayout?: PageLayout,
        public authorities?: BaseEntity[],
        public modules?: BaseEntity[],
    ) {
        this.modules = [];
        this.authorities = [];
    }
}

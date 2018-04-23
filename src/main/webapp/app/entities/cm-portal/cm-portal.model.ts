import { BaseEntity } from './../../shared';

export class CmPortal implements BaseEntity {
    constructor(
        public id?: number,
        public portalKey?: string,
        public contentPath?: string,
        public name?: string,
        public metaName?: string,
        public metaTitle?: string,
        public metaApplicationName?: string,
        public metaKeywords?: string,
        public metaDescription?: string,
    ) {
    }
}

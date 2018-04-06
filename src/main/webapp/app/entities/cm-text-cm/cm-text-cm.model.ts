import { BaseEntity } from './../../shared';

export const enum TextType {
    'TITLE',
    'INGRESS',
    'TEXT',
    'LIST'
}

export const enum LayoutType {
    'LEFT',
    'RIGHT',
    'MIDDLE',
    'CENTER',
    'TOP',
    'BOTTOM',
    'SIDEBYSIDE'
}

export class CmTextCm implements BaseEntity {
    constructor(
        public id?: number,
        public textSv?: string,
        public textEn?: string,
        public fontSize?: string,
        public fontWeight?: string,
        public textType?: TextType,
        public sorted?: number,
        public layout?: LayoutType,
        public textDate?: any,
        public publishDate?: any,
        public publish?: boolean,
        public cmModuleId?: number,
        public cmItemId?: number,
        public imageId?: number,
    ) {
        this.publish = false;
    }
}

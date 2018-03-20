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
        public type?: TextType,
        public sort?: number,
        public layout?: LayoutType,
        public date?: any,
        public publishDate?: any,
        public publish?: boolean,
        public cmModuleId?: number,
        public cmItemId?: number,
    ) {
        this.publish = false;
    }
}

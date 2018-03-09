import { BaseEntity } from './../../shared';

export const enum LayoutType {
    'LEFT',
    'RIGHT',
    'MIDDLE',
    'CENTER',
    'TOP',
    'BOTTOM',
    'SIDEBYSIDE'
}

export class CmImageCm implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: string,
        public toolTip?: string,
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

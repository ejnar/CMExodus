import { BaseEntity } from './../../shared';

export const enum LayoutType {
    'LEFT',
    'RIGHT',
    'MIDDLE',
    'CENTER',
    'TOP',
    'BOTTOM',
    'SIDEBYSIDE',
    'DEFAULT'
}

export class CmImage implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public imageType?: string,
        public toolTip?: string,
        public sorted?: number,
        public layout?: LayoutType,
        public publishDate?: any,
        public publish?: boolean,
        public cmModuleId?: number,
        public cmItemId?: number,
        public uploadStatus?: string,
        public base64?: string,
        public data?: any
    ) {
        this.publish = false;
    }
}

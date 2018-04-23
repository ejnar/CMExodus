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

export class CmItem implements BaseEntity {
    constructor(
        public id?: number,
        public itemDate?: any,
        public sorted?: number,
        public toolTip?: string,
        public layout?: LayoutType,
        public publishDate?: any,
        public publish?: boolean,
        public cmModuleId?: number,
        public texts?: BaseEntity[],
        public images?: BaseEntity[],
    ) {
        this.publish = false;
    }
}

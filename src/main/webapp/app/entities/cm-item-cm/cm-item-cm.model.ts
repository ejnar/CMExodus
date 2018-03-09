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

export class CmItemCm implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public toolTip?: string,
        public layout?: LayoutType,
        public cmModuleId?: number,
        public texts?: BaseEntity[],
        public images?: BaseEntity[],
    ) {
    }
}

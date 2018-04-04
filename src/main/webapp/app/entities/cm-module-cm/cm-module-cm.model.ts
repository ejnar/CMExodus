import { BaseEntity } from './../../shared';

export const enum ModuleType {
    'TEXT',
    'IMAGE',
    'TEXT_IMAGE',
    'IMAGE_LIST',
    'PROGRAM_LIST'
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

export class CmModuleCm implements BaseEntity {
    constructor(
        public id?: number,
        public sorted?: number,
        public moduleType?: ModuleType,
        public layout?: LayoutType,
        public lists?: BaseEntity[],
        public texts?: BaseEntity[],
        public images?: BaseEntity[],
    ) {
    }
}

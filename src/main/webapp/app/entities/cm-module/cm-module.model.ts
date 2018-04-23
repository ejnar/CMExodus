import { BaseEntity } from './../../shared';

export const enum ModuleType {
    'TEXT',
    'IMAGE',
    'TEXT_IMAGE',
    'TEXT_LIST',
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

export const enum ColumnLayout {
    'MAIN',
    'COLUMN1',
    'COLUMN2'
}

export class CmModule implements BaseEntity {
    constructor(
        public id?: number,
        public sorted?: number,
        public moduleType?: ModuleType,
        public layout?: LayoutType,
        public columnLayout?: ColumnLayout,
        public items?: BaseEntity[],
        public itemLists?: BaseEntity[],
        public texts?: BaseEntity[],
        public images?: BaseEntity[],
    ) {
    }
}

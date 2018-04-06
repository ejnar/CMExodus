import { BaseEntity } from './../../shared';

export const enum TypeOfEvent {
    'SERVICE',
    'CAFE',
    'YOUTH'
}

export class CmItemListCm implements BaseEntity {
    constructor(
        public id?: number,
        public textSv?: string,
        public textEn?: string,
        public titleSv?: string,
        public titleEn?: string,
        public ingressSv?: string,
        public ingressEn?: string,
        public sorted?: number,
        public toolTip?: string,
        public typeOfEvent?: TypeOfEvent,
        public location?: string,
        public itemDate?: any,
        public publishDate?: any,
        public publish?: boolean,
        public cmModuleId?: number,
        public imageId?: number,
    ) {
        this.publish = false;
    }
}
